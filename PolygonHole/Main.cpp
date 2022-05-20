# include <Siv3D.hpp> // OpenSiv3D v0.6.4

void Main()
{
	Polygon polygon = Scene::Rect().stretched(-40).asPolygon();

	while (System::Update())
	{
		const Rect rect{ Arg::center = Cursor::Pos(), 60, 40 };

		if (MouseL.down())
		{
			if (not polygon.addHole(rect))
			{
				Print << U"Failed";
			}
		}

		polygon.draw(ColorF{ 0.8, 0.9, 1.0 });

		rect.draw(ColorF{ 1.0, 0.5 });
	}
}