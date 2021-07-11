# include <Siv3D.hpp>
# include <emscripten.h>

void Main()
{
	Window::Resize(1280, 720);
	Window::SetStyle(WindowStyle::Sizable);
	Scene::SetBackground(ColorF{ 0.8, 0.9, 1.0 });

	const Texture windmillTexture{ U"example/windmill.png", TextureDesc::Mipped };
	const Texture earthTexture{ U"example/earth.jpg", TextureDesc::Mipped };
	const Texture emoji{ U"🐈"_emoji };

	// 3D 形状クラスは準備中なので Mesh を作成。
	// 今後の実装で、Sphere{...}.draw(), AABB{...}.draw() などをできるようにする。
	Mesh smallPlaneMesh
	{
		// MeshData
		{
			// Array<Vertex3D>
			{
				{ .pos = { -6.0f, 0.0f,  6.0f }, .normal = { 0.0f, 1.0f, 0.0f }, .tex = { 0.0f, 0.0f } },
				{ .pos = {  6.0f, 0.0f,  6.0f }, .normal = { 0.0f, 1.0f, 0.0f }, .tex = { 1.0f, 0.0f } },
				{ .pos = { -6.0f, 0.0f, -6.0f }, .normal = { 0.0f, 1.0f, 0.0f }, .tex = { 0.0f, 1.0f } },
				{ .pos = {  6.0f, 0.0f, -6.0f }, .normal = { 0.0f, 1.0f, 0.0f }, .tex = { 1.0f, 1.0f } },
			},
			// Array<TriangleIndex32>
			{
				{ 0, 1, 2 },
				{ 2, 1, 3 },
			}
		}
	};
	const Box floorAABB{ Vec3{ 0, 0, 0 }, Vec3{ 20, 0.01, 20 } };
	const Mesh floorMesh{ MeshData::Box( Vec3{ 0, 0, 0 }, Vec3{ 20, 0.01, 20 } ) };
	const Mesh markerMesh{ MeshData::Sphere( Vec3{0,0,0}, 0.2 ) };
	const Mesh smallBoxMesh{ MeshData::Box( Vec3{0,0,0}, Vec3{0.25, 0.25, 0.25} ) };
	const Mesh earthMesh{ MeshData::Sphere( Vec3{0,3,0}, 3.0 ) };
	const Mesh boxMesh{ MeshData::Box( Vec3{0,0,0}, Vec3{2,2,2} ) };
	const Mesh ballMesh{ MeshData::Sphere( Vec3{0,0,0}, 1.0 ) };

	Image image{ 1000, 1000, Palette::White };
	DynamicTexture dtexture{ image };
	Optional<Vec2> previousPenPos;

	Platform::Web::System::SetMainLoop([&]
	{
		System::Update();

		const double t = Scene::Time();
		constexpr double verticlaFOV = 30_deg;
		const Vec3 eyePosition = Cylindrical{ 20, (t * 2_deg), (8 + Periodic::Sine0_1(40s) * 8) };
		constexpr Vec3 focusPosition{ 0, 0, 0 };
		const BasicCamera3D camera{ Graphics3D::GetRenderTargetSize(), verticlaFOV, eyePosition, focusPosition };
		const Ray ray = camera.screenToRay(Cursor::PosF());
		Graphics3D::SetCameraTransform(camera.getViewProj());

		if (const auto opt = ray.intersects(floorAABB))
		{
			const Vec3 intersectionPoint = ray.point_at(*opt);
			markerMesh.draw(intersectionPoint, Palette::Orange);
			const Vec2 penPos = intersectionPoint.xz();

			if (MouseL.pressed())
			{
				const Vec2 from = (previousPenPos ? *previousPenPos : penPos);
				const Vec2 to = penPos;
				previousPenPos = penPos;
				Line{ from * Vec2{ 50, -50 }, to * Vec2{ 50, -50 } }
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

		smallPlaneMesh.draw(Mat4x4::RotateY(30_deg).translated(8, 0, 9), HSV{ 250, 0.5, 0.9 });
		smallPlaneMesh.draw(Mat4x4::RotateY(50_deg).translated(-12, 0, 6), HSV{ 170, 0.5, 0.9 });
		smallPlaneMesh.draw(Mat4x4::RotateY(10_deg).translated(7, 0, -7), HSV{ 30, 0.5, 0.9 });
		floorMesh.draw(dtexture);
		earthMesh.draw(Vec3{ 0,0,0 }, Quaternion::RollPitchYaw(0, t * -15_deg, 0), earthTexture);

		for (auto i : step(36))
		{
			const Vec3 pos = Cylindrical{ 3.5, t + 20_deg + i * 10_deg, 3 + Math::Sin(i * 10_deg * 1 + t * 40_deg) };
			const auto mat = Mat4x4::RotateX(i * 10_deg).translated(pos);
			smallBoxMesh.draw(mat, HSV{ i * 10, 0.8, 1.0 });
		}

		boxMesh.draw(-8, 1, 0, ColorF{ 0.25 });
		boxMesh.draw(8, 1, 0, windmillTexture);
		ballMesh.draw(-2, (1 + Periodic::Jump0_1(2s) * 4), 8, ColorF{ 0.5, 0.8, 0.4 });
		ballMesh.draw(0, (1 + Periodic::Jump0_1(2s, t + 0.3) * 4), 8, ColorF{ 0.8, 0.4, 0.5, });
		ballMesh.draw(2, (1 + Periodic::Jump0_1(2s, t + 0.6) * 4), 8, ColorF{ 0.4, 0.5, 0.8 });

		emoji.draw(Cursor::Pos());
	});
}
