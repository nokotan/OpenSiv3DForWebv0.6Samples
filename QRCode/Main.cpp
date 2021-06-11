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
	DynamicTexture qrTexture { Size(800, 800) };

	TextEditState text;
	text.text = U"https://github.com/Siv3D/OpenSiv3D/tree/v6_winmac_develop";

	SetMainLoop([&]
	{
		System::Update();

		if (SimpleGUI::TextBox(text, Vec2(10, 10), 800))
		{
			Grid<bool> qr = QR::EncodeText(text.text);	
			SVG svg = QR::MakeSVG(qr);
			
			qrTexture.fill(svg.render(800, 800));
		}

		if (qrTexture)
		{
			qrTexture.draw(10, 50);
		}
	});
}
