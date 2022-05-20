# include <Siv3D.hpp> // OpenSiv3D v0.6.4

void Main()
{
	Window::Resize(1280, 720);

	const ColorF backgroundColor = ColorF{ 0.4, 0.6, 0.8 }.removeSRGBCurve();
	const Texture uvChecker{ U"example/texture/uv.png", TextureDesc::MippedSRGB };
	const Texture earthTexture{ U"example/texture/earth.jpg", TextureDesc::MippedSRGB };
	const MSRenderTexture renderTexture{ Scene::Size(), TextureFormat::R8G8B8A8_Unorm_SRGB, HasDepth::Yes };
	DebugCamera3D camera{ renderTexture.size(), 30_deg, Vec3{ 10, 16, -32 } };

	while (System::Update())
	{
		camera.update(2.0);
		Graphics3D::SetCameraTransform(camera);

		// 3D 描画
		{
			const ScopedRenderTarget3D target{ renderTexture.clear(backgroundColor) };

			Plane{ 64 }.draw(ColorF{ 0.7, 0.9, 0.8 }.removeSRGBCurve());

			const double t = Fraction(Scene::Time() * 0.125);

			const double tx = Floor(t * 8) / 8.0;

			Plane{ Vec3{0, 0.05, 0}, 4 }.draw(uvChecker.uv(0.0, t, 0.125, 0.125));

			Box{ 6, 2, 0, 4 }.draw(uvChecker.uv(t, 0.0, 0.25, 0.25));

			Box{ 1, 5, 3, 2 }.oriented(Quaternion::RollPitchYaw(Scene::Time() * 10_deg, Scene::Time() * 70_deg, 0.0f)).draw(uvChecker.uv(tx, 0.0, 0.125, 0.125));
		}

		// 3D シーンを 2D シーンに描画
		{
			Graphics3D::Flush();
			renderTexture.resolve();
			Shader::LinearToScreen(renderTexture);
		}
	}
}