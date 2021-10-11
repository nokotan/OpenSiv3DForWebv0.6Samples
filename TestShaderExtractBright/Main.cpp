# include <Siv3D.hpp>

void Main()
{
    Scene::SetResizeMode(ResizeMode::Keep);
	Scene::Resize(1280, 720);
	Scene::SetResizeMode(ResizeMode::Keep);

	const PixelShader psBright = HLSL{ U"example/shader/hlsl/extract_bright_linear.hlsl", U"PS" }
		| GLSL{ U"example/shader/glsl/extract_bright_linear.frag", {{U"PSConstants2D", 0}} }
		| ESSL{ U"example/shader/essl/extract_bright_linear.frag", {{U"PSConstants2D", 0}} };

	if (not psBright)
	{
		return;
	}

	const ColorF backgroundColor = ColorF{ 0.02 }.removeSRGBCurve();
	const MSRenderTexture renderTexture{ Scene::Size(), TextureFormat::R16G16B16A16_Float, HasDepth::Yes };
	RenderTexture rtA4{ renderTexture.size() / 4 }, rtB4{ renderTexture.size() / 4 };
	RenderTexture rtA8{ renderTexture.size() / 8 }, rtB8{ renderTexture.size() / 8 };
	RenderTexture rtA16{ renderTexture.size() / 16 }, rtB16{ renderTexture.size() / 16 };
	DebugCamera3D camera{ renderTexture.size(), 30_deg, Vec3{ 10, 16, -32 } };

	bool glowEffect = true;

    while (System::Update())
    {
        camera.update(2.0);

		// 3D
		{
			Graphics3D::SetCameraTransform(camera);

			const ScopedRenderTarget3D target{ renderTexture.clear(backgroundColor) };

			PhongMaterial phong;
			phong.amibientColor = ColorF{ 1.0 };
			phong.diffuseColor = ColorF{ 0.0 };

			for (auto i : Range(0, 10))
			{
				phong.emissionColor = ColorF{ 1.0, 0.4, 0.4 }.removeSRGBCurve() * (i / 5.0);
				Box{ {-20 + i * 4, 2, 8}, 2 }
					.draw(phong);

				phong.emissionColor = ColorF{ 0.4, 1.0, 0.4 }.removeSRGBCurve() * (i / 5.0);
				Sphere{ {-20 + i * 4, 2, 0}, 1 }
					.draw(phong);

				phong.emissionColor = ColorF{ 0.4, 0.4, 1.0 }.removeSRGBCurve() * (i / 5.0);
				Cylinder{ {-20 + i * 4, 2, -8}, 1, 2 }
					.draw(phong);
			}
		}

		// RenderTexture を 2D シーンに描画
		{
			Graphics3D::Flush();
			renderTexture.resolve();
			Shader::LinearToScreen(renderTexture);
		}

		if (glowEffect)
		{
			// 高輝度部分を抽出
			{
				const ScopedCustomShader2D shader{ psBright };
				const ScopedRenderTarget2D target{ rtA4.clear(ColorF{0.0}) };
				renderTexture.scaled(0.25).draw();
			}

			// 高輝度部分のぼかしテクスチャの生成
			{
				Shader::GaussianBlur(rtA4, rtB4, rtA4);
				Shader::Downsample(rtA4, rtA8);
				Shader::GaussianBlur(rtA8, rtB8, rtA8);
				Shader::GaussianBlur(rtA8, rtB8, rtA8);
				Shader::Downsample(rtA8, rtA16);
				Shader::GaussianBlur(rtA16, rtB16, rtA16);
				Shader::GaussianBlur(rtA16, rtB16, rtA16);
				Shader::GaussianBlur(rtA16, rtB16, rtA16);
			}

			// Glow エフェクト
			{
				const ScopedRenderStates2D blend{ BlendState::AdditiveRGB };

				{
					const ScopedRenderTarget2D target{ rtA8 };
					rtA16.scaled(2.0).draw(ColorF{ 3.0 });
				}

				{
					const ScopedRenderTarget2D target{ rtA4 };
					rtA8.scaled(2.0).draw(ColorF{ 1.0 });
				}

				rtA4.resized(Scene::Size()).draw(ColorF{ 1.0 });
			}
		}

		SimpleGUI::CheckBox(glowEffect, U"Glow", Vec2{ 20,20 });
    }
}