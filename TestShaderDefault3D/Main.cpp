# include <Siv3D.hpp>

void Main()
{
    Window::Resize(1280, 720);

	const VertexShader vs3D = HLSL{ U"example/shader/hlsl/default3d_forward.hlsl", U"VS" }
		| GLSL{ U"example/shader/glsl/default3d_forward.vert", {{ U"VSPerView", 1 }, { U"VSPerObject", 2 }} }
		| ESSL{ U"example/shader/essl/default3d_forward.vert", {{ U"VSPerView", 1 }, { U"VSPerObject", 2 }} };

	const PixelShader ps3D = HLSL{ U"example/shader/hlsl/default3d_forward.hlsl", U"PS" }
		| GLSL{ U"example/shader/glsl/default3d_forward.frag", {{ U"PSPerFrame", 0 }, { U"PSPerView", 1 }, { U"PSPerMaterial", 3 }} }
		| ESSL{ U"example/shader/essl/default3d_forward.frag", {{ U"PSPerFrame", 0 }, { U"PSPerView", 1 }, { U"PSPerMaterial", 3 }} };

	if ((not vs3D) || (not ps3D))
	{
		return;
	}

	const ColorF backgroundColor = ColorF{ 0.4, 0.6, 0.8 }.removeSRGBCurve();
	const Texture uvChecker{ U"example/texture/uv.png", TextureDesc::MippedSRGB };
	const MSRenderTexture renderTexture{ Scene::Size(), TextureFormat::R8G8B8A8_Unorm_SRGB, HasDepth::Yes };
	DebugCamera3D camera{ renderTexture.size(), 30_deg, Vec3{ 10, 16, -32 } };

    Platform::Web::System::SetMainLoop([&]()
    {
        System::Update();
        
        camera.update(2.0);

		// 3D
		{
			Graphics3D::SetCameraTransform(camera);

			const ScopedCustomShader3D shader{ vs3D, ps3D };
			const ScopedRenderTarget3D target{ renderTexture.clear(backgroundColor) };

			Plane{ 64 }.draw(uvChecker);
			Box{ -8,2,0,4 }.draw(ColorF{ 0.8, 0.6, 0.4 }.removeSRGBCurve());
			Sphere{ 0,2,0,2 }.draw(ColorF{ 0.4, 0.8, 0.6 }.removeSRGBCurve());
			Cylinder{ 8, 2, 0, 2, 4 }.draw(ColorF{ 0.6, 0.4, 0.8 }.removeSRGBCurve());
		}

		// RenderTexture を 2D シーンに描画
		{
			Graphics3D::Flush();
			renderTexture.resolve();
			Shader::LinearToScreen(renderTexture);
		}
    });
}