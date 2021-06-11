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
	Scene::SetBackground(ColorF{ 0.15 });

	const Polygon polygon0 = Shape2D::Plus(180, 100, Scene::Center().movedBy(-350, -120));
	const Polygon polygon1 = Shape2D::Heart(180, Scene::Center().movedBy(0, 120));
	const Polygon polygon2 = Shape2D::NStar(8, 180, 140, Scene::Center().movedBy(350, -120));

	SetMainLoop([&]
	{
		System::Update();

		const double t = (Scene::Time() * 720);

		polygon0.draw(ColorF{ 0.4 });
		polygon0.outline(t, 200).draw(LineStyle::RoundCap, 8, ColorF{ 0, 1, 0.5 });

		polygon1.draw(ColorF{ 0.4 });
		polygon1.outline(t, 200).draw(LineStyle::RoundCap, 8, ColorF{ 0, 1, 0.5 });
		
		polygon2.draw(ColorF{ 0.4 });
		polygon2.outline(t, 200).draw(LineStyle::RoundCap, 8, ColorF{ 0, 1, 0.5 });
	});
}
