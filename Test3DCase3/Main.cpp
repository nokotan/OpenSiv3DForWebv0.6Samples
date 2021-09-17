# include <Siv3D.hpp>
# include <emscripten.h>

void Main()
{
	Scene::SetResizeMode(ResizeMode::Keep);
	Scene::Resize(1280, 720);
	Window::SetStyle(WindowStyle::Sizable);
	Scene::SetBackground(ColorF{ 0.8, 0.9, 1.0 });

	const Texture windmillTexture{ U"example/windmill.png", TextureDesc::Mipped };
	const Texture earthTexture{ U"example/texture/earth.jpg", TextureDesc::Mipped };
	const Texture emoji{ U"🐈"_emoji };

	const Plane floorPlane{ { 0, 0.01, 0 }, 20 };
	Image image{ 1000, 1000, Palette::White };
	DynamicTexture dtexture{ image };
	Optional<Vec2> previousPenPos;

	const Mesh mesh{ MeshData::Cylinder({0, 4, 0}, 3, 3) };

	Graphics3D::SetGlobalAmbientColor(ColorF{ 0.6 });
	Graphics3D::SetSunColor(ColorF{ 0.4 });

	Platform::Web::System::SetMainLoop([&]
	{
		System::Update();

		const double t = Scene::Time();
		constexpr double verticlaFOV = 30_deg;
		const Vec3 eyePosition = Cylindrical{ 20, (t * 1_deg), (8 + Periodic::Sine0_1(40s) * 8) };
		constexpr Vec3 focusPosition{ 0, 0, 0 };
		const BasicCamera3D camera{ Graphics3D::GetRenderTargetSize(), verticlaFOV, eyePosition, focusPosition, Vec3::Up(), 0.1 };
		const Ray ray = camera.screenToRay(Cursor::PosF());
		Graphics3D::SetCameraTransform(camera);

		if (const auto pos = ray.intersectsAt(floorPlane))
		{
			Sphere{ *pos, 0.2 }.draw(Palette::Orange);
			const Vec2 penPos = pos->xz();

			if (MouseL.pressed())
			{
				const Vec2 from = (previousPenPos ? *previousPenPos : penPos);
				const Vec2 to = penPos;
				previousPenPos = penPos;
				Line{ (from * Vec2{ 50, -50 }), (to * Vec2{ 50, -50 }) }
					.movedBy(500, 500)
					.overwrite(image, 5, Palette::Orange);
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

		Plane{ {8, 0, 9}, 12 }.draw(Quaternion::RotateY(30_deg), HSV{ 250, 0.5, 0.9 });

		for (auto x : Range(-20, 20))
		{
			Line3D{ {x,4,-20},{x,4,20} }.draw(ColorF{ 1.0, 0.0, 0.0 });
		}

		Plane{ {-12, 0, 6}, 12 }.draw(Quaternion::RotateY(50_deg), HSV{ 170, 0.5, 0.9 });
		Plane{ {7, 0, -7}, 12 }.draw(Quaternion::RotateY(10_deg), HSV{ 30, 0.5, 0.9 });
		floorPlane.draw(dtexture);

		for (auto x : Range(-20, 20))
		{
			Line3D{ {-20,4,x},{20,4,x} }.draw(ColorF{ 1.0, 0.0, 0.0 });
		}

		for (auto i : step(36))
		{
			const Vec3 pos = Cylindrical{ 3.5, (t + 20_deg + i * 10_deg), (3 + Math::Sin(i * 10_deg * 1 + t * 40_deg)) };
			Box{ pos, 0.25 }
				.draw(Quaternion::RotateX(i * 10_deg), HSV{ i * 10, 0.8, 1.0 });
		}

		Box{ {-8,1,0}, 2 }.draw(ColorF{ 0.25 });
		Box{ {8,1,0}, 2 }.draw(windmillTexture);
		Sphere{ {-2, (1 + Periodic::Jump0_1(2s) * 4), 8}, 1 }.draw(ColorF{ 0.5, 0.8, 0.4 });
		Sphere{ {0, (1 + Periodic::Jump0_1(2s, t + 0.3) * 4), 8}, 1 }.draw(ColorF{ 0.8, 0.4, 0.5, });
		Sphere{ {2, (1 + Periodic::Jump0_1(2s, t + 0.6) * 4), 8}, 1 }.draw(ColorF{ 0.4, 0.5, 0.8 });
		Disc{ {-2, (0.2 + Periodic::Jump0_1(2s) * 4), 5}, 1 }.draw(ColorF{ 0.5, 0.8, 0.4 });
		Cylinder{ {0, (1 + Periodic::Jump0_1(2s, t + 0.3) * 4), 5}, 1, 2 }.draw(ColorF{ 0.8, 0.4, 0.5, });
		Cylinder{ {2, (1 + Periodic::Jump0_1(2s, t + 0.6) * 4), 5}, 0.1, 2 }.draw(ColorF{ 0.4, 0.5, 0.8 });
		Sphere{ {0, 3, 0}, 3 }
			.draw(Quaternion::RotateY(t * -15_deg), earthTexture);

		emoji.draw(Cursor::Pos());
	});
}
