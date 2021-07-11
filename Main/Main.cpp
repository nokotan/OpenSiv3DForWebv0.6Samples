# include <Siv3D.hpp>
# include <emscripten.h>

void Main()
{
	Platform::Web::System::SetMainLoop([&]
	{
		System::Update();

		for (auto i : step(20))
		{
			Rect(Cursor::Pos().movedBy(0 + i * 20, 0), 20, 400)
				.draw(HSV(i * 10, 0.5, 0.9));
		}
	});
}
