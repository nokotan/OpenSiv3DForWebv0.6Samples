# include <Siv3D.hpp>
# include <emscripten.h>

void RunMainLoop(void* arg)
{
	static_cast<const std::function<void()>*>(arg)->operator()();
}

void SetMainLoop(std::function<void()> mainLoop)
{
	emscripten_set_main_loop_arg(RunMainLoop, reinterpret_cast<void*>(&mainLoop), 0, 1);
}

void Main()
{
	Window::Resize(1280, 720);
	Scene::SetBackground(ColorF{ 0.1, 0.2, 0.2 });

	constexpr Size size{ 1280, 720 };
	constexpr Rect rect{ size };
	Subdivision2D subdiv{ rect };

	for (const PoissonDisk2D pd{ size, 40 };
		const auto & point : pd.getPoints())
	{
		if (rect.contains(point))
		{
			subdiv.addPoint(point);
		}
	}

	const Array<Polygon> facetPolygons = subdiv
		.calculateVoronoiFacets()
		.map([rect](const VoronoiFacet& f)
			{
				return Geometry2D::And(Polygon{ f.points }, rect).front();
			});

	Polygon mesh;
	NavMesh navMeshL, navMeshS;
	LineString pathL, pathS;
	constexpr double agentRadiusL = 30, agentRadiusS = 10;
	const Vec2 lStart{ 140, 120 };
	const Vec2 sStart{ 100, 200 };
	const Vec2 goal{ 1100, 300 };
	const Polygon goalDiamond = RectF{ Arg::center = goal, 48 }.rotated(45_deg).calculateRoundBuffer(3);

	SetMainLoop([&]{
		System::Update();

		for (const auto& facetPolygon : facetPolygons)
		{
			facetPolygon
				.draw(ColorF{ 0.3 })
				.drawFrame(2, ColorF{ 0.25 });
		}

		if (MouseL.pressed())
		{
			const Vec2 pos = Cursor::Pos();

			for (const auto& facetPolygon : facetPolygons)
			{
				if (facetPolygon.intersects(pos))
				{
					if (mesh.isEmpty())
					{
						mesh = facetPolygon;
					}
					else
					{
						mesh.append(facetPolygon);
						navMeshL.build(mesh, NavMeshConfig{ .agentRadius = agentRadiusL });
						navMeshS.build(mesh, NavMeshConfig{ .agentRadius = agentRadiusS });
						pathL = navMeshL.query(lStart, goal);
						pathS = navMeshS.query(sStart, goal);
					}

					break;
				}
			}
		}

		mesh.draw(ColorF{ 0.9, 0.8, 0.6 }).drawFrame(6, ColorF{ 0.5, 0.3, 0.0 });

		lStart.asCircle(agentRadiusL).draw(ColorF{ 0.2, 0.6, 0.5 });
		pathL.draw(6, ColorF{ 0.2, 0.6, 0.5 });

		sStart.asCircle(agentRadiusS).draw(ColorF{ 0.2, 0.3, 0.5 });
		pathS.draw(6, ColorF{ 0.2, 0.3, 0.5 });

		goalDiamond.draw(ColorF{ 0.9, 0.2, 0.0 });
	});
}
