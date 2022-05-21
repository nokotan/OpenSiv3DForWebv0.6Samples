# include <Siv3D.hpp> // OpenSiv3D v0.6.4

void Main()
{
	constexpr Size SceneSize{ 256, 192 };
	const ColorF backgroundColor = ColorF{ 0.4, 0.6, 0.8 }.removeSRGBCurve();

	const Texture wiindmill{ Image{ U"example/windmill.png" }.clipped(200, 230, 64, 64), TextureDesc::UnmippedSRGB };
	const Texture siv3dKun{ Image{ U"example/spritesheet/siv3d-kun-16.png" }.clipped(0, 0, 20, 32), TextureDesc::UnmippedSRGB };

	const Mesh spriteMesh{ MeshData::TwoSidedPlane(SizeF{ 2.0, 3.2 }).rotate(Quaternion::RotateX(-90_deg)) };
	const RenderTexture renderTexture{ SceneSize, TextureFormat::R8G8B8A8_Unorm_SRGB, HasDepth::Yes };

	DebugCamera3D camera{ renderTexture.size(), 30_deg, Vec3{ 10, 2, -32 } };

	while (System::Update())
	{
		camera.update(2.0);
		Graphics3D::SetCameraTransform(camera);

		// [3D rendering]
		{
			const ScopedRenderTarget3D target{ renderTexture.clear(backgroundColor) };

			Plane{ 64 }.draw(ColorF{ 0.7 }.removeSRGBCurve());
			Box::FromPoints(Vec3{ -4, 0, -4 }, Vec3{ -2, 4, 4 }).draw(ColorF{ 0.8, 0.6, 0.4 }.removeSRGBCurve());
			Plane{ Vec3{0, 4, 0 }, 64 }.draw(ColorF{ 0.5 }.removeSRGBCurve());

			{
				const ScopedRenderStates3D sampler{ SamplerState::ClampNearest };
				Box{ 4, 2, 0, 4 }.draw(wiindmill);
			}

			{
				const ScopedRenderStates3D sampler{ SamplerState::ClampNearest, BlendState::Default2D };
				spriteMesh.draw(Vec3{ 0, 1.6, -4 }, siv3dKun);
			}
		}

		// [2D rendering]
		{
			Graphics3D::Flush();

			// TextureFilter::Nearest
			Shader::LinearToScreen(renderTexture, TextureFilter::Nearest);
		}
	}
}