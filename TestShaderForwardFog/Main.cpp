# include <Siv3D.hpp>

struct PSFog
{
	Float3 fogColor;
	float fogCoefficient;
};

void Main()
{
    Scene::SetResizeMode(ResizeMode::Keep);
	Scene::Resize(1280, 720);

	const PixelShader ps = HLSL{ U"example/shader/hlsl/forward_fog.hlsl", U"PS" }
		| GLSL{ U"example/shader/glsl/forward_fog.frag", {{ U"PSPerFrame", 0 }, { U"PSPerView", 1 }, { U"PSPerMaterial", 3 }, { U"PSFog", 4 }} }
		| ESSL{ U"example/shader/essl/forward_fog.frag", {{ U"PSPerFrame", 0 }, { U"PSPerView", 1 }, { U"PSPerMaterial", 3 }, { U"PSFog", 4 }} };

	if (not ps)
	{
		return;
	}

	const ColorF backgroundColor = ColorF{ 0.4, 0.6, 0.8 }.removeSRGBCurve();
	const Texture uvChecker{ U"example/texture/uv.png", TextureDesc::MippedSRGB };
	const MSRenderTexture renderTexture{ Scene::Size(), TextureFormat::R8G8B8A8_Unorm_SRGB, HasDepth::Yes };
	DebugCamera3D camera{ renderTexture.size(), 30_deg, Vec3{ 10, 16, -32 } };

	double fogParam = 0.6;
	ConstantBuffer<PSFog> cb{ { backgroundColor.rgb(), 0.0f } };

    Platform::Web::System::SetMainLoop([&]()
    {
        System::Update();
        
        camera.update(2.0);

		const double fogCoefficient = Math::Eerp(0.001, 0.25, fogParam);
		cb->fogCoefficient = static_cast<float>(fogCoefficient);

		// 3D
		{
			Graphics3D::SetCameraTransform(camera);
			Graphics3D::SetPSConstantBuffer(4, cb);

			const ScopedCustomShader3D shader{ ps };
			const ScopedRenderTarget3D target{ renderTexture.clear(backgroundColor) };

			Plane{ 64 }.draw(uvChecker);

			for (auto x : Range(-4, 4))
			{
				for (auto z : Range(-4, 4))
				{
					Box{ {x * 8, 4, z * 8} , {2, 8, 2} }.draw();
				}
			}
		}

		// RenderTexture を 2D シーンに描画
		{
			Graphics3D::Flush();
			renderTexture.resolve();
			Shader::LinearToScreen(renderTexture);
		}

		SimpleGUI::Slider(U"fogCoefficient: {:.3f}"_fmt(fogCoefficient), fogParam, Vec2{ 20, 20 }, 200, 160);
    });
}