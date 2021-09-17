# include <Siv3D.hpp>

void Main()
{
	Scene::SetResizeMode(ResizeMode::Keep);
   	Scene::SetBackground(ColorF{ 0.4, 0.5, 0.6 });

	const Texture e0{ U"🪨"_emoji };
	const Texture e1{ U"🧋"_emoji };
	const Texture e2{ U"🪙"_emoji };
	const Texture e3{ U"🪜"_emoji };
	const Texture e4{ U"🪟"_emoji };
	const Texture e5{ U"🪵"_emoji };
	const Texture e6{ U"🪴"_emoji };
	const Texture e7{ U"🪣"_emoji };
	const Texture e8{ U"🪦"_emoji };
	const Texture e9{ U"🪧"_emoji };
	const Texture e10{ U"🪑"_emoji };
	const Texture e11{ U"🧊"_emoji };

    Platform::Web::System::SetMainLoop([&]()
    {
        System::Update();
        
        e0.drawAt(100, 100);
		e1.drawAt(300, 100);
		e2.drawAt(500, 100);
		e3.drawAt(700, 100);
		e4.drawAt(100, 300);
		e5.drawAt(300, 300);
		e6.drawAt(500, 300);
		e7.drawAt(700, 300);
		e8.drawAt(100, 500);
		e9.drawAt(300, 500);
		e10.drawAt(500, 500);
		e11.drawAt(700, 500);
    });
}