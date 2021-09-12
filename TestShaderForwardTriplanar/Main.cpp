# include <Siv3D.hpp>

void Main()
{
    Window::Resize(1280, 720);

	const PixelShader ps3D = HLSL{ U"example/shader/hlsl/forward_triplanar.hlsl", U"PS" }
		| GLSL{ U"example/shader/glsl/forward_triplanar.frag", {{ U"PSPerFrame", 0 }, { U"PSPerView", 1 }, { U"PSPerMaterial", 3 }} }
		| ESSL{ U"example/shader/essl/forward_triplanar.frag", {{ U"PSPerFrame", 0 }, { U"PSPerView", 1 }, { U"PSPerMaterial", 3 }} };

	if (not ps3D)
	{
		return;
	}

	const ColorF backgroundColor = ColorF{ 0.4, 0.6, 0.8 }.removeSRGBCurve();
	const Texture uvChecker{ U"example/texture/uv.png", TextureDesc::MippedSRGB };
	const Texture woodTexture{ U"example/texture/wood.jpg", TextureDesc::MippedSRGB };
	const MSRenderTexture renderTexture{ Scene::Size(), TextureFormat::R8G8B8A8_Unorm_SRGB, HasDepth::Yes };
	DebugCamera3D camera{ renderTexture.size(), 30_deg, Vec3{ 10, 16, -32 } };

	const Mesh mesh0{ MeshData::Octahedron(2) };
	const Mesh mesh1{ MeshData::Dodecahedron(2) };
	const Mesh mesh2{ MeshData::Icosahedron(2) };

	bool triplanar = true;

    Platform::Web::System::SetMainLoop([&]()
    {
        System::Update();
        
        camera.update(2.0);

		// 3D
		{
			Graphics3D::SetCameraTransform(camera);

			const ScopedRenderTarget3D target{ renderTexture.clear(backgroundColor) };

			Plane{ 64 }.draw(uvChecker);

			const auto shader =
				triplanar ? ScopedCustomShader3D{ ps3D } : ScopedCustomShader3D{};

			Box{ -8,2,0,4 }.draw(woodTexture);
			Sphere{ 0,2,0,2 }.draw(woodTexture);
			Cylinder{ 8, 2, 0, 2, 4 }.draw(woodTexture);
			mesh0.draw({ -8, 2, 8 }, woodTexture);
			mesh1.draw({ 0, 2, 8 }, woodTexture);
			mesh2.draw({ 8, 2, 8 }, woodTexture);
		}

		// RenderTexture を 2D シーンに描画
		{
			Graphics3D::Flush();
			renderTexture.resolve();
			Shader::LinearToScreen(renderTexture);
		}

		SimpleGUI::CheckBox(triplanar, U"triplanar", Vec2{ 20,20 });
    });
}