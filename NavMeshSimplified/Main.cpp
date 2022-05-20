# include <Siv3D.hpp> // OpenSiv3D v0.6.4

void Main()
{
	Scene::SetBackground(ColorF{ 0.8, 0.9, 1.0 });

	Polygon polygon = Scene::Rect().stretched(-40).asPolygon();
	polygon.addHole(Rect{ 100, 100, 200, 200 });
	polygon.addHole(Rect{ 200, 350, 150, 100 });
	polygon.addHole(Rect{ 500, 200, 200, 200 });

	const Vec2 start{ 70, 70 };
	NavMesh navMesh{ polygon, NavMeshConfig{ .agentRadius = 10 } };

	while (System::Update())
	{
		polygon.draw();

		const Vec2 goal = Cursor::Pos();
		const LineString lines(navMesh.query(start, goal));

		lines.draw(5, Palette::Red);
		start.asCircle(8).draw(Palette::Red);
		goal.asCircle(8).draw(Palette::Red);
	}
}