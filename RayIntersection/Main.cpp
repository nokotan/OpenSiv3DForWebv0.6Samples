# include <Siv3D.hpp>

template <class Shape>
void Draw(const Shape& shape, const Ray& ray)
{
	if (auto pos = ray.intersectsAt(shape))
	{
		shape.draw(Linear::Palette::Orange);
		Sphere{ *pos, 0.15 }.draw(Linear::Palette::Red);
	}
	else
	{
		shape.draw(HSV{ (shape.center.x * 60), 0.1, 0.95 }.removeSRGBCurve());
	}
}

void Main()
{
	Window::Resize(1280, 720);
	Graphics3D::SetGlobalAmbientColor(ColorF{ 0.25 });
	const ColorF backgroundColor = ColorF{ 0.4, 0.6, 0.8 }.removeSRGBCurve();
	const Texture uvChecker{ U"example/texture/uv.png", TextureDesc::MippedSRGB };
	const MSRenderTexture renderTexture{ Scene::Size(), TextureFormat::R8G8B8A8_Unorm_SRGB, HasDepth::Yes };
	DebugCamera3D camera{ renderTexture.size(), 30_deg, Vec3{ 10, 16, -32 } };

	const Sphere sphere = Sphere{ { 2, 2, 8 }, 2 };
	const Box box1 = Box::FromPoints({ -13, 0, 14 }, { -2, 4, 13 });
	const Box box2 = Box::FromPoints({ -14, 0, 14 }, { -13, 2, 2 });
	const Cylinder cy1{ {-8,2,4},{-4, 5,6}, 1 };
	const Cylinder cy2{ {-10,2,1},{-6, 3,-2}, 0.5 };

    while (System::Update())
    {
        camera.update(2.0);

		// 3D
		{
			Graphics3D::SetCameraTransform(camera);
			const Ray ray = camera.screenToRay(Cursor::PosF());
			const ScopedRenderTarget3D target{ renderTexture.clear(backgroundColor) };
			const OrientedBox ob1 = OrientedBox{ Arg::bottomCenter(-4, 0, 3), { 4, 2, 0.25 },  Quaternion::RotateY(Scene::Time() * -20_deg) };
			const OrientedBox ob2 = OrientedBox{ Arg::bottomCenter(0, 0, -1), { 4, 2, 0.25 },  Quaternion::RotateY(Scene::Time() * 20_deg) };
			const Cone cone{ { 4, 4, 0},{ 4, 7, 0}, 1.0, Quaternion::RotateZ(Scene::Time() * 10_deg) };

			Plane{ 64 }.draw(uvChecker);
			Draw(sphere, ray);
			Draw(box1, ray);
			Draw(box2, ray);
			Draw(cy1, ray);
			Draw(cy2, ray);
			Draw(ob1, ray);
			Draw(ob2, ray);
			Draw(cone, ray);
		}

		// RenderTexture を 2D シーンに描画
		{
			Graphics3D::Flush();
			renderTexture.resolve();
			Shader::LinearToScreen(renderTexture);
		}
    }
}