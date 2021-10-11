# include <Siv3D.hpp>

void Main()
{
	Scene::SetResizeMode(ResizeMode::Keep);
	Scene::Resize(900, 600);
	Scene::SetBackground(ColorF{ 0.8, 0.9, 1.0 });

	Graphics3D::SetGlobalAmbientColor(ColorF{ 0.0 });
	Graphics3D::SetSunColor(ColorF{ 1.0 });

	const MSRenderTexture renderTexture8{ 300, 600, TextureFormat::R8G8B8A8_Unorm_SRGB, HasDepth::Yes };
	const MSRenderTexture renderTexture16{ 300, 600, TextureFormat::R16G16B16A16_Float, HasDepth::Yes };
	DebugCamera3D camera{ Size{ 300, 600 }, 45_deg, Vec3{ -12, 3, -12 } };

	Platform::Web::System::SetMainLoop([&]
	{
		

		{
			const ScopedViewport3D viewPort{ Rect{ 0, 0, 300, 600 } };
			Graphics3D::SetCameraTransform(camera);
			Sphere{ {0, 3, 0}, 3 }.draw();
		}

		{
			renderTexture8.clear(ColorF{ 0.8, 0.9, 1.0 }.removeSRGBCurve());
			const ScopedRenderTarget3D rt{ renderTexture8 };
			Graphics3D::SetCameraTransform(camera);
			Sphere{ {0, 3, 0}, 3 }.draw();
		}

		{
			renderTexture16.clear(ColorF{ 0.8, 0.9, 1.0 }.removeSRGBCurve());
			const ScopedRenderTarget3D rt{ renderTexture16 };
			Graphics3D::SetCameraTransform(camera);
			Sphere{ {0, 3, 0}, 3 }.draw();
		}

		// RenderTexture を 2D シーンに描画
		{
			Graphics3D::Flush();
			renderTexture8.resolve();
			Shader::LinearToScreen(renderTexture8, Rect{ 300, 0, 300, 600 });

			renderTexture16.resolve();
			Shader::LinearToScreen(renderTexture16, Rect{ 600, 0, 300, 600 });
		}

		PutText(U"中央と右（リニアレンダリング）はライトのエッジがはっきりする", Scene::Center().movedBy(0, 80));
	});
}
