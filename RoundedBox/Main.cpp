# include <Siv3D.hpp> // OpenSiv3D v0.6.4

void Main()
{
	Window::Resize(1280, 720);

	const PixelShader ps = HLSL{ U"example/shader/hlsl/forward_triplanar.hlsl", U"PS" }
		| GLSL{ U"example/shader/glsl/forward_triplanar.frag", {{ U"PSPerFrame", 0 }, { U"PSPerView", 1 }, { U"PSPerMaterial", 3 }} }
		| ESSL{ U"example/shader/essl/forward_triplanar.frag", {{ U"PSPerFrame", 0 }, { U"PSPerView", 1 }, { U"PSPerMaterial", 3 }} }
		| WGSL{ U"example/shader/wgsl/forward_triplanar.frag.wgsl", {{ U"PSPerFrame", 0 }, { U"PSPerView", 1 }, { U"PSPerMaterial", 3 }} };

	if (not ps)
	{
		return;
	}

	const ColorF backgroundColor = ColorF{ 0.4, 0.6, 0.8 }.removeSRGBCurve();
	const Texture uvChecker{ U"example/texture/uv.png", TextureDesc::MippedSRGB };
	const Texture woodTexture{ U"example/texture/wood.jpg", TextureDesc::MippedSRGB };
	const MSRenderTexture renderTexture{ Scene::Size(), TextureFormat::R8G8B8A8_Unorm_SRGB, HasDepth::Yes };
	DebugCamera3D camera{ renderTexture.size(), 30_deg, Vec3{ 10, 16, -32 } };

	const Mesh mesh0{ MeshData::RoundedBox(1, Vec3{ 4, 4, 4 }, 1) };
	const Mesh mesh1{ MeshData::RoundedBox(1, Vec3{ 4, 4, 4 }, 2) };
	const Mesh mesh2{ MeshData::RoundedBox(1, Vec3{ 4, 4, 4 }, 3) };
	const Mesh mesh3{ MeshData::RoundedBox(1, Vec3{ 4, 4, 4 }, 4) };

	const Mesh meshA1{ MeshData::RoundedBox(0.5, Vec3{ 4, 4, 1 }, 4) };
	const Mesh meshA2{ MeshData::RoundedBox(1.7, Vec3{ 4, 4, 4 }, 4) };
	const Mesh meshA3{ MeshData::RoundedBox(2.0, Vec3{ 4, 6, 4 }, 4) };

	while (System::Update())
	{
		camera.update(2.0);

		// 3D
		{
			Graphics3D::SetCameraTransform(camera);

			const ScopedRenderTarget3D target{ renderTexture.clear(backgroundColor) };

			Plane{ 64 }.draw(uvChecker);

			{
				const ScopedRenderStates3D wireframe{ RasterizerState::WireframeCullNone };
				const ColorF color{ 0.0 };
				mesh0.draw(Vec3{ -12, 2, 6 }, color);
				mesh1.draw(Vec3{ -6, 2, 6 }, color);
				mesh2.draw(Vec3{ 0, 2, 6 }, color);
				mesh3.draw(Vec3{ 6, 2, 6 }, color);
			}

			mesh0.draw(Vec3{ -12, 2, 0 });
			mesh1.draw(Vec3{ -6, 2, 0 });
			mesh2.draw(Vec3{ 0, 2, 0 });
			mesh3.draw(Vec3{ 6, 2, 0 });

			{
				const ScopedCustomShader3D shader{ ps };
				mesh0.draw({ -12, 2, -6 }, woodTexture);
				mesh1.draw({ -6, 2, -6 }, woodTexture);
				mesh2.draw({ 0, 2, -6 }, woodTexture);
				mesh3.draw({ 6, 2, -6 }, woodTexture);

				meshA1.draw({ 12, 2, -12 }, woodTexture);
				meshA2.draw({ 18, 2, -12 }, woodTexture);
				meshA3.draw({ 24, 3, -12 }, woodTexture);
			}
		}

		// RenderTexture を 2D シーンに描画
		{
			Graphics3D::Flush();
			renderTexture.resolve();
			Shader::LinearToScreen(renderTexture);
		}
	}
}