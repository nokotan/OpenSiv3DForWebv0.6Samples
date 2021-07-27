# include <Siv3D.hpp>

void Main()
{
	const Texture texture{ U"example/windmill.png", TextureDesc::Mipped };
	const Texture textureSRGB{ U"example/windmill.png", TextureDesc::MippedSRGB };
	RenderTexture renderTexture{ 400, 100, ColorF{0.8, 0.9, 1.0} };
	RenderTexture renderTextureSRGB{ 400, 100, ColorF{0.8, 0.9, 1.0}, TextureFormat::R8G8B8A8_Unorm_SRGB };
	RenderTexture renderTextureSRGB2{ 400, 100, ColorF{0.8, 0.9, 1.0}.removeSRGBCurve(), TextureFormat::R8G8B8A8_Unorm_SRGB };

	Platform::Web::System::SetMainLoop([&]
	{
		System::Update();

		texture.draw(0, 0);
		textureSRGB.draw(400, 0);
		renderTexture.draw(0, 320);
		renderTextureSRGB.draw(400, 320);
		renderTextureSRGB2.draw(0, 425);
		Shader::LinearToScreen(renderTextureSRGB2, Vec2{ 400, 425 });
	});
}
