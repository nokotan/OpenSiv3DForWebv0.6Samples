# include <Siv3D.hpp>

void Main()
{
    Window::Resize(1280, 720);

	Webcam webcam{ 0, Size{ 1280, 720 }, StartImmediately::Yes };

	DynamicTexture texture { 1280, 720 };

    Platform::Web::System::SetMainLoop([&]()
    {
        System::Update();
        
        if (!webcam)
		{
			if (SimpleGUI::Button(U"Retry", Vec2{ 20, 20 }))
			{
				webcam = Webcam{ 0, Size{ 1280, 720 }, StartImmediately::Yes };
			}
		}
		
		if (webcam.hasNewFrame())
		{
			webcam.getFrame(texture);
		}

		if (texture)
		{
			texture.draw();
		}
    });
}