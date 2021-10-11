# include <Siv3D.hpp>

void DrawModel(const Model& model, const Mat4x4& mat)
{
	const Transformer3D t{ mat };

	const auto& materials = model.materials();

	for (const auto& object : model.objects())
	{
		object.draw(materials);
	}
}

void DrawMillModel(const Model& model, const Mat4x4& mat)
{
	const auto& materials = model.materials();

	for (const auto& object : model.objects())
	{
		Mat4x4 m = Mat4x4::Identity();

		// 風車の羽根の回転
		if (object.name == U"Mill_Blades_Cube.007")
		{
			m *= Mat4x4::Rotate(Vec3{ 0,0,-1 }, (Scene::Time() * -120_deg), Vec3{ 0, 9.37401, 0 });
		}

		const Transformer3D t{ (m * mat) };

		object.draw(materials);
	}
}

void Main()
{
	Window::SetStyle(WindowStyle::Sizable);
	Scene::SetBackground(ColorF{ 0.4, 0.6, 0.8 });

	const Mesh groundPlane{ MeshData::OneSidedPlane(2000, { 400, 400 }) };
	const Texture groundTexture{ U"example/texture/ground.jpg", TextureDesc::Mipped };
	const Model blacksmithModel{ U"example/obj/blacksmith.obj", ColorOption::ApplySRGBCurve };
	const Model millModel{ U"example/obj/mill.obj", ColorOption::ApplySRGBCurve };
	const Model treeModel{ U"example/obj/tree.obj", ColorOption::ApplySRGBCurve };
	const Model pineModel{ U"example/obj/pine.obj", ColorOption::ApplySRGBCurve };
	Model::RegisterDiffuseTextures(treeModel, TextureDesc::Mipped);
	Model::RegisterDiffuseTextures(pineModel, TextureDesc::Mipped);

	DebugCamera3D camera{ Graphics3D::GetRenderTargetSize(), 25_deg, Vec3{ 0, 3, -16 } };
	Graphics3D::SetGlobalAmbientColor(ColorF{ 0.5 });
	Graphics3D::SetSunColor(ColorF{ 0.5 });

	while (System::Update())
	{
		const Vec2 uiPosition{ Scene::Size() - Vec2(210, 250) };
		
		// 3D
		{
			camera.update(4.0);
			camera.updateTouchUI(uiPosition, 1.0f);
			Graphics3D::SetCameraTransform(camera);

			// draw models
			{
				// 地面の描画
				groundPlane.draw(groundTexture);

				// 球の描画
				Sphere{ { 0, 1, 0 }, 1 }.draw(ColorF{ 0.75 });

				// 鍛冶屋の描画
				DrawModel(blacksmithModel, Mat4x4::Translate(8, 0, 4));

				// 風車の描画
				DrawMillModel(millModel, Mat4x4::Translate(-8, 0, 4));

				// 木の描画
				{
					const ScopedRenderStates3D bl{ BlendState::OpaqueAlphaToCoverage, RasterizerState::SolidCullNone };
					DrawModel(treeModel, Mat4x4::Translate(16, 0, 4));
					DrawModel(pineModel, Mat4x4::Translate(16, 0, 0));
				}
			}
		}

		camera.drawTouchUI(uiPosition, 1.0f);
    }
}
