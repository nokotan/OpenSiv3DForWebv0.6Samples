# include <Siv3D.hpp>
# include <emscripten.h>

void Main()
{
	Window::SetStyle(WindowStyle::Sizable);

	const Texture windmillTexture{ U"example/windmill.png", TextureDesc::MippedSRGB };
	const Texture earthTexture{ U"example/texture/earth.jpg", TextureDesc::MippedSRGB };
	const Texture emoji{ U"🐈"_emoji };

	const Plane floorPlane{ { 0, 0.01, 0 }, 20 };
	Image image{ 1000, 1000, Palette::White };
	DynamicTexture dtexture{ image, TextureDesc::MippedSRGB };
	Optional<Vec2> previousPenPos;

	const Mesh mesh{ MeshData::Cylinder({0, 4, 0}, 3, 3) };

	const MSRenderTexture renderTexture{ Scene::Size(), TextureFormat::R8G8B8A8_Unorm_SRGB, HasDepth::Yes };
	Graphics3D::SetGlobalAmbientColor(ColorF{ 0.6 });
	Graphics3D::SetSunColor(ColorF{ 0.4 });

	Platform::Web::System::SetMainLoop([&]
	{
		

		const double t = Scene::Time();
		constexpr double verticlaFOV = 30_deg;
		const Vec3 eyePosition = Cylindrical{ 20, (t * 1_deg), (8 + Periodic::Sine0_1(40s) * 8) };
		constexpr Vec3 focusPosition{ 0, 0, 0 };
		const BasicCamera3D camera{ Graphics3D::GetRenderTargetSize(), verticlaFOV, eyePosition, focusPosition, Vec3::Up(), 0.1 };
		const Ray ray = camera.screenToRay(Cursor::PosF());
		{
			Graphics3D::SetCameraTransform(camera);
			renderTexture.clear(ColorF{ 0.8, 0.9, 1.0 }.removeSRGBCurve());
			const ScopedRenderTarget3D target{ renderTexture };

			if (const auto pos = ray.intersectsAt(floorPlane))
			{
				Sphere{ *pos, 0.2 }.draw(ColorF{ Palette::Orange }.removeSRGBCurve());
				const Vec2 penPos = pos->xz();

				if (MouseL.pressed())
				{
					const Vec2 from = (previousPenPos ? *previousPenPos : penPos);
					const Vec2 to = penPos;
					previousPenPos = penPos;
					Line{ (from * Vec2{ 50, -50 }), (to * Vec2{ 50, -50 }) }
						.movedBy(500, 500)
						.overwrite(image, 5, ColorF{ Palette::Orange }.removeSRGBCurve());
					dtexture.fill(image);
				}
				else
				{
					previousPenPos.reset();
				}
			}
			else
			{
				previousPenPos.reset();
			}

			Plane{ {8, 0, 9}, 12 }.draw(Quaternion::RotateY(30_deg), ColorF{ HSV{ 250, 0.5, 0.9 } }.removeSRGBCurve());

			for (auto x : Range(-20, 20))
			{
				Line3D{ {x,4,-20},{x,4,20} }.draw(ColorF{ 1.0, 0.0, 0.0 }.removeSRGBCurve());
			}

			Plane{ {-12, 0, 6}, 12 }.draw(Quaternion::RotateY(50_deg), ColorF{ HSV{ 170, 0.5, 0.9 } }.removeSRGBCurve());
			Plane{ {7, 0, -7}, 12 }.draw(Quaternion::RotateY(10_deg), ColorF{ HSV{ 30, 0.5, 0.9 } }.removeSRGBCurve());
			floorPlane.draw(dtexture);

			for (auto x : Range(-20, 20))
			{
				Line3D{ {-20,4,x},{20,4,x} }.draw(ColorF{ 1.0, 0.0, 0.0 }.removeSRGBCurve());
			}

			for (auto i : step(36))
			{
				const Vec3 pos = Cylindrical{ 3.5, (t + 20_deg + i * 10_deg), (3 + Math::Sin(i * 10_deg * 1 + t * 40_deg)) };
				Box{ pos, 0.25 }
				.draw(Quaternion::RotateX(i * 10_deg), ColorF{ HSV{ i * 10, 0.8, 1.0 } }.removeSRGBCurve());
			}

			Box{ {-8,1,0}, 2 }.draw(ColorF{ 0.25 });
			Box{ {8,1,0}, 2 }.draw(windmillTexture);
			Sphere{ {-2, (1 + Periodic::Jump0_1(2s) * 4), 8}, 1 }.draw(ColorF{ 0.5, 0.8, 0.4 }.removeSRGBCurve());
			Sphere{ {0, (1 + Periodic::Jump0_1(2s, t + 0.3) * 4), 8}, 1 }.draw(ColorF{ 0.8, 0.4, 0.5, }.removeSRGBCurve());
			Sphere{ {2, (1 + Periodic::Jump0_1(2s, t + 0.6) * 4), 8}, 1 }.draw(ColorF{ 0.4, 0.5, 0.8 }.removeSRGBCurve());
			Disc{ {-2, (0.2 + Periodic::Jump0_1(2s) * 4), 5}, 1 }.draw(ColorF{ 0.5, 0.8, 0.4 }.removeSRGBCurve());
			Cylinder{ {0, (1 + Periodic::Jump0_1(2s, t + 0.3) * 4), 5}, 1, 2 }.draw(ColorF{ 0.8, 0.4, 0.5, }.removeSRGBCurve());
			Cylinder{ {2, (1 + Periodic::Jump0_1(2s, t + 0.6) * 4), 5}, 0.1, 2 }.draw(ColorF{ 0.4, 0.5, 0.8 }.removeSRGBCurve());
			Sphere{ {0, 3, 0}, 3 }
				.draw(Quaternion::RotateY(t * -15_deg), earthTexture);
		}

		// RenderTexture を 2D シーンに描画
		{
			Graphics3D::Flush();
			renderTexture.resolve();
			Shader::LinearToScreen(renderTexture);
		}

		emoji.draw(Cursor::Pos());
	});
}
