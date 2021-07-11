# include <Siv3D.hpp>

void Main()
{
	Window::Resize(1280, 720);
	Scene::SetBackground(ColorF{ 0.75 });

	Array<Vec2> points;
	Spline2D spline;

	Polygon polygon;
	Stopwatch stopwatch;
	SplineIndex si;

	Platform::Web::System::SetMainLoop([&]
	{
		System::Update();

		// 制御点の追加
		if (MouseL.down())
		{
			points << Cursor::Pos();
			spline = Spline2D{ points, CloseRing::Yes };
			polygon = spline.calculateRoundBuffer(24);
			stopwatch.restart();
		}

		// 各区間の Bounding Rect の可視化
		for (size_t i = 0; i < spline.size(); ++i)
		{
			const ColorF color = Colormap01F(i / 18.0);
			spline.boundingRect(i)
				.draw(ColorF{ color, 0.1 })
				.drawFrame(1, 0, ColorF{ color, 0.5 });
		}

		// 点を追加してから 1 秒間は三角形分割を表示
		if (stopwatch.isRunning()
			&& (stopwatch < 1s))
		{
			polygon.drawWireframe(1, ColorF{ 0.25, (1.0 - stopwatch.sF()) });
			polygon.draw(ColorF{ 0.4, stopwatch.sF() });
		}
		else
		{
			polygon.draw(ColorF{ 0.4 });
			// 曲率に応じた色でスプラインを描画
			spline.draw(10, [&](SplineIndex si) { return Colormap01F(spline.curvature(si) * 24); });
		}

		// 制御点の表示
		for (const auto& point : points)
		{
			Circle{ point, 8 }.drawFrame(2, ColorF{ 0.8 });
		}

		// スプライン上を移動する物体
		if (spline)
		{
			si = spline.advanceWrap(si, Scene::DeltaTime() * 400);
			Circle{ spline.position(si), 20 }.draw(HSV{ 145, 0.9, 0.95 });
		}
	});
}
