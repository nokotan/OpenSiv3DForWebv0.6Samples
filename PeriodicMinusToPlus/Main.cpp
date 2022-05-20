# include <Siv3D.hpp> // OpenSiv3D v0.6.4

void Main()
{
	Scene::SetBackground(Palette::White);

	while (System::Update())
	{
		const double p0 = Periodic::Square1_1(2s);
		const double p1 = Periodic::Triangle1_1(2s);
		const double p2 = Periodic::Sine1_1(2s);
		const double p3 = Periodic::Sawtooth1_1(2s);
		const double p4 = Periodic::Jump1_1(2s);

		Line{ 100, 0, 100, 600 }.draw(2, ColorF{ 0.8 });
		Line{ 700, 0, 700, 600 }.draw(2, ColorF{ 0.8 });

		Circle{ (400 + p0 * 300), 100, 20 }.draw(ColorF{ 0.25 });
		Circle{ (400 + p1 * 300), 200, 20 }.draw(ColorF{ 0.25 });
		Circle{ (400 + p2 * 300), 300, 20 }.draw(ColorF{ 0.25 });
		Circle{ (400 + p3 * 300), 400, 20 }.draw(ColorF{ 0.25 });
		Circle{ (400 + p4 * 300), 500, 20 }.draw(ColorF{ 0.25 });
	}
}