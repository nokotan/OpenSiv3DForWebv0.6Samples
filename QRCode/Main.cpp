# include <Siv3D.hpp>

void Main()
{
	Scene::SetResizeMode(ResizeMode::Keep);
	DynamicTexture qrTexture { Size(800, 800) };

	TextEditState text;
	text.text = U"https://github.com/Siv3D/OpenSiv3D/tree/v6_winmac_develop";

	Platform::Web::System::SetMainLoop([&]
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
