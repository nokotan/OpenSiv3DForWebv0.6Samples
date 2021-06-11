# include <Siv3D.hpp>
# include <emscripten.h>

void RunMainLoop(void* arg)
{
	static_cast<const std::function<void()>*>(arg)->operator()();
}

void SetMainLoop(std::function<void()> mainLoop)
{
	emscripten_set_main_loop_arg(RunMainLoop, reinterpret_cast<void*>(&mainLoop), 0, 1);
}

void Main()
{
	Window::Resize(1280, 720);

	const Array<MultiPolygon> countries = GeoJSONFeatureCollection{ JSON::Load(U"example/geojson/countries.geojson") }.getFeatures()
		.map([](const GeoJSONFeature& f) { return f.getGeometry().getPolygons(); });

	Camera2D camera{ Vec2{ 0, 0 }, 2.0, Camera2DParameters{.maxScale = 4096.0 } };
	Optional<size_t> selected;

	SetMainLoop([&]{
		System::Update();

		ClearPrint();

		camera.update();
		{
			const auto transformer = camera.createTransformer();
			const double lineThickness = (1.0 / Graphics2D::GetMaxScaling());
			const RectF viewRect = camera.getRegion();

			Print << Cursor::PosF();
			Print << camera.getScale() << U"x";

			Rect{ Arg::center(0, 0), 360, 180 }.draw(ColorF{ 0.2, 0.6, 0.9 }); // 海
			{
				for (auto [i, country] : Indexed(countries))
				{
					// 画面外にある場合は描画をスキップ
					if (!country.calculateBoundingRect().intersects(viewRect))
					{
						continue;
					}

					if (country.leftClicked())
					{
						selected = i;
					}

					country.draw((selected == i) ? ColorF{ 0.9, 0.8, 0.7 } : ColorF{ 0.93, 0.99, 0.96 });
					country.drawFrame(lineThickness, ColorF{ 0.25 });
				}
			}
		}
		camera.draw(Palette::Orange);
	});
}
