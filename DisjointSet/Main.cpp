# include <Siv3D.hpp> // OpenSiv3D v0.6.4

void Main()
{
	Window::Resize(1280, 720);
	Scene::SetBackground(ColorF{ 0.8, 0.9, 1.0 });

	// フォント
	const Font font{ FontMethod::MSDF, 48, Typeface::Heavy };

	// セルの大きさ
	constexpr int32 CellSize = 16;

	// マス目の数
	constexpr Size GridSize{ 1280 / CellSize, 720 / CellSize };

	// 塗りつぶし (白: true, 黒: false)
	Grid<bool> grid(GridSize, true);

	// Disjoint Set (Union-Find)
	DisjointSet<int32> ds{ GridSize.x * GridSize.y };

	// 現在存在する領域の root と, 領域の座標の合計値 (中心計算用)
	HashTable<int32, Vec2> currentRoots;

	// root の番号と色 (hue) の対応表
	HashTable<int32, int32> globalColorTable;
	int32 colorIndex = 0;

	// UnionFind を更新する必要があるか
	bool isDirty = true;

	while (System::Update())
	{
		if (isDirty)
		{
			// Disjoint Set を更新
			{
				ds.reset();

				for (int32 y = 0; y < GridSize.y; ++y)
				{
					for (int32 x = 0; x < GridSize.x; ++x)
					{
						if (grid[y][x])
						{
							const int32 index = (y * GridSize.x + x);

							if (int32 nx = (x + 1); nx < GridSize.x)
							{
								if (grid[y][nx])
								{
									ds.merge(index, index + 1);
								}
							}

							if (int32 ny = (y + 1); ny < GridSize.y)
							{
								if (grid[ny][x])
								{
									ds.merge(index, (index + GridSize.x));
								}
							}
						}
					}
				}
			}

			// 存在する root 一覧を作成
			{
				currentRoots.clear();

				for (int32 y = 0; y < GridSize.y; ++y)
				{
					for (int32 x = 0; x < GridSize.x; ++x)
					{
						if (grid[y][x])
						{
							const int32 index = (y * GridSize.x + x);
							const int32 root = ds.find(index);
							const Vec2 pos{ x, y };

							if (auto it = currentRoots.find(root); it == currentRoots.end())
							{
								currentRoots.emplace(root, pos);
							}
							else
							{
								it->second += pos;
							}
						}
					}
				}
			}

			// root と色の対応表を更新
			{
				for (auto& currentRoot : currentRoots)
				{
					if (not globalColorTable.contains(currentRoot.first))
					{
						globalColorTable.emplace(currentRoot.first, (colorIndex++ * 55));
					}
				}

				EraseNodes_if(globalColorTable, [&](const auto& p) { return (not currentRoots.contains(p.first)); });
			}

			isDirty = false;
		}

		// すべてのマスを描画
		for (auto p : step(GridSize))
		{
			const Rect rect = Rect{ (p * CellSize), CellSize }.stretched(-1);

			if (grid[p])
			{
				const int32 index = (p.y * GridSize.x + p.x);
				const int32 root = ds.find(index);
				rect.draw(HSV{ globalColorTable[root], 0.25, 1.0 });
			}
			else
			{
				rect.draw(ColorF{ 0.4 });
			}
		}

		// クリックされたらマスの状態を更新
		if ((MouseL | MouseR).pressed())
		{
			const Point pos = (Cursor::Pos() / CellSize);

			if (InRange(pos.x, 0, (GridSize.x - 1))
				&& InRange(pos.y, 0, (GridSize.y - 1)))
			{
				const bool old = grid[pos];
				grid[pos] = MouseL.pressed() ? false : true;
				isDirty = (old != grid[pos]);
			}
		}

		// 領域の情報を表示
		for (const auto& currentRoot : currentRoots)
		{
			const int32 root = currentRoot.first;
			const int32 size = static_cast<int32>(ds.size(root));
			const Vec2 center = currentRoot.second / size;
			const HSV textColor = HSV{ globalColorTable[root], 0.55, 0.9 };
			const Vec2 pos = (center * CellSize) + (Vec2::All(CellSize) * 0.5);
			const double fontSize = (20 + 2 * Sqrt(size));
			const double w = font(size).region(fontSize).w;

			Circle{ pos, (w / 1.66 + 10) }.draw(ColorF{ 1.0, 0.88 }).drawFrame(3, textColor);
			font(size).drawAt(fontSize, pos, textColor);
		}
	}
}