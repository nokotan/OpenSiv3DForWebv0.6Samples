# include <Siv3D.hpp>

void Main()
{
	Scene::SetResizeMode(ResizeMode::Keep);
	Scene::SetBackground(ColorF{ 0.8, 0.9, 1.0 });

	DebugCamera3D camera{ Graphics3D::GetRenderTargetSize(), 45_deg, Vec3{ 0, 3, -16 } };
	Graphics3D::SetGlobalAmbientColor(ColorF{ 1.0 });
	Graphics3D::SetSunColor(ColorF{ 0.0 });

	Platform::Web::System::SetMainLoop([&]
	{
		

		// 3D
		{
			camera.update(4.0);
			Graphics3D::SetCameraTransform(camera);

			Plane{ 80 }.draw(ColorF{ 0.9, 0.8, 0.7 });

			for (auto i : Range(0, 10))
			{
				Sphere{ {i * 2, 1, 20}, 1 }.draw(ColorF{ i * 0.1 });
			}

			for (auto i : Range(0, 10))
			{
				Sphere{ {i * 2, 1, 0}, 1 }.draw(ColorF{ HSV{ i * 36, 0.8, 0.9 } });
			}
		}

		for (auto i : Range(0, 10))
		{
			Rect{ 200 + i * 40, 0, 40 }.draw(ColorF{ i * 0.1 });
		}

		for (auto i : Range(0, 10))
		{
			Rect{ 200 + i * 40, 200, 40 }.draw(HSV{ i * 36, 0.8, 0.9 });
		}

		PutText(U"色見本と球の色が一致すれば OK です。", Scene::Center());
	});
}
