# include <Siv3D.hpp>

void DrawScene(const ViewFrustum& frustum, const Texture& groundTexture)
{
	Plane{ 60 }.draw(groundTexture);
	const ColorF orange = ColorF{ Palette::Orange }.removeSRGBCurve();

	for (auto z : Range(-5, 5))
	{
		for (auto x : Range(-8, 8))
		{
			for (auto y : Range(0, 8))
			{
				const Sphere s{ x,y,z, 0.2 };
				s.draw(frustum.intersects(s) ? orange : ColorF{ 1.0 });
			}
		}
	}
}

void Main()
{
    Window::SetStyle(WindowStyle::Sizable);
	Graphics3D::SetGlobalAmbientColor(ColorF{ 0.5 });

	const ColorF backgroundColor = ColorF{ 0.4, 0.6, 0.8 }.removeSRGBCurve();
	const Texture groundTexture{ U"example/texture/uv.png", TextureDesc::MippedSRGB };
	const MSRenderTexture renderTexture{ Scene::Size(), TextureFormat::R8G8B8A8_Unorm_SRGB, HasDepth::Yes };
	const MSRenderTexture renderTexture2{ 360, 240, TextureFormat::R8G8B8A8_Unorm_SRGB, HasDepth::Yes };
	DebugCamera3D camera1{ renderTexture.size(), 25_deg, Vec3{ 10, 16, -32 } };
	BasicCamera3D camera2{ renderTexture2.size(), 25_deg };

    while (System::Update())
    {
        
		
		const Vec2 uiPosition{ Scene::Size() - Vec2(210, 250) };
        
        camera1.update(4.0);
		camera1.updateTouchUI(uiPosition, 1.0f);
		const Vec3 camera2Pos = Cylindrical{ 18, (Scene::Time() * 10_deg), (2 + Periodic::Sine0_1(4s) * 10) };
		camera2.setView(camera2Pos, Vec3::Zero());
		const Vec3 upDirection = Vec3{ Math::Sin(Scene::Time() * 0.2), 1, 0 }.normalized() * camera2.getLookAtOrientation();
		camera2.setUpDirection(upDirection);
		const ViewFrustum frustum{ camera2, 1.0, 50.0 };

		// 俯瞰カメラ (camera1)
		{
			Graphics3D::SetCameraTransform(camera1);
			const ScopedRenderTarget3D target{ renderTexture.clear(backgroundColor) };
			DrawScene(frustum, groundTexture);
			frustum.drawFrame(Palette::Red);
			Line3D{ camera2Pos, camera2Pos + upDirection * 4 }.draw(Palette::Red);
			OrientedBox{ frustum.getOrigin(), {1.2, 0.8, 2}, frustum.getOrientation() }.draw(ColorF{ 0.2 }.removeSRGBCurve());
		}

		// (camera2)
		{
			Graphics3D::SetCameraTransform(camera2);
			const ScopedRenderTarget3D target{ renderTexture2.clear(backgroundColor) };
			DrawScene(frustum, groundTexture);
		}

		// RenderTexture を 2D シーンに描画
		{
			Graphics3D::Flush();
			renderTexture.resolve();
			renderTexture2.resolve();
			Shader::LinearToScreen(renderTexture);
			RectF{ 360,240 }.drawShadow({ 0,0 }, 8, 3);
			Shader::LinearToScreen(renderTexture2, Vec2{ 0,0 });
		}

		camera1.drawTouchUI(Scene::Size() - Vec2(100, 100));
    }
}