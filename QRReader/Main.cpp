# include <Siv3D.hpp>

void Main()
{
    Scene::SetResizeMode(ResizeMode::Keep);
	Scene::Resize(1280, 720);

	Webcam webcam{ 0, Size{ 1280, 720 }, StartImmediately::Yes };

	Image image;
	DynamicTexture texture;
	QRScanner qrScanner;
	Array<QRContent> contents;

    while (System::Update())
    {
        
        
        if (!webcam)
		{
			if (SimpleGUI::Button(U"Retry", Vec2{ 20, 20 }))
			{
				webcam = Webcam{ 0, Size{ 1280, 720 }, StartImmediately::Yes };
			}
		}
		else
		{
			Scene::Resize(webcam.getResolution());
		}
		
		if (webcam.hasNewFrame())
		{
			webcam.getFrame(image);

			texture.fill(image);

			contents = qrScanner.scan(image);
		}

		// Webcam 作成待機中は円を表示
		if (!webcam)
		{
			Circle{ Scene::Center(), 40 }
				.drawArc(Scene::Time() * 180_deg, 300_deg, 5, 5);
		}

		if (texture)
		{
			texture.draw();
		}

		for (const auto& content : contents)
		{
			content.quad.drawFrame(4, Palette::Red);

			PutText(content.text, Arg::topLeft = content.quad.p0);
		}
    }
}