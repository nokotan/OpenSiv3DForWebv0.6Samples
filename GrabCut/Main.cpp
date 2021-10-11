# include <Siv3D.hpp>

void Main()
{
	Scene::SetResizeMode(ResizeMode::Keep);
	Scene::Resize(1280, 720);
	Scene::SetBackground(ColorF{ 0.8, 1.0, 0.9 });
	
	const Image image{ U"example/windmill.png" };
	const Texture texture{ image };

	GrabCut grabcut{ image };
	Image mask{ image.size(), Color{0, 0} };
	Image background{ image.size(), Palette::Black };
	Image foreground{ image.size(), Palette::Black };
	Image inpaint;
	DynamicTexture maskTexture{ mask };
	Grid<GrabCutClass> result;
	DynamicTexture classTexture;
	DynamicTexture backgroundTexture{ background };
	DynamicTexture foregroundTexture{ foreground };
	DynamicTexture inpaintTexture{ foreground };

	constexpr Color BackgroundColor{ 0, 0, 255 };
	constexpr Color ForegroundColor{ 250, 100, 50 };
	
	Platform::Web::System::SetMainLoop([&]
	{
		

		if (!classTexture || MouseL.up() || MouseR.up())
		{
			grabcut.update(mask, ForegroundColor, BackgroundColor);
			grabcut.getResult(result);
			classTexture.fill(Image(result, [](GrabCutClass c) { return Color(80 * FromEnum(c)); }));

			for (auto p : step(image.size()))
			{
				const bool isBackground = (GrabCutClass::PossibleBackground <= result[p]);

				if (isBackground)
				{
					background[p] = image[p];
					foreground[p] = Color{ 0,0 };
				}
				else
				{
					foreground[p] = image[p];
					background[p] = Color{ 0,0 };
				}
			}

			ImageProcessing::Inpaint(background, background, Color{ 0, 0 }, inpaint);
			inpaint.gaussianBlur(3);

			foregroundTexture.fill(foreground);
			backgroundTexture.fill(background);
			inpaintTexture.fill(inpaint);
		}

		if (MouseL.pressed())
		{
			const Point from = MouseL.down() ? Cursor::Pos() : Cursor::PreviousPos();
			const Point to = Cursor::Pos();
			Line{ from, to }.overwrite(mask, 4, ForegroundColor, Antialiased::No);
			maskTexture.fill(mask);
		}
		else if (MouseR.pressed())
		{
			const Point from = MouseR.down() ? Cursor::Pos() : Cursor::PreviousPos();
			const Point to = Cursor::Pos();
			Line{ from, to }.overwrite(mask, 4, BackgroundColor, Antialiased::No);
			maskTexture.fill(mask);
		}

		texture.draw();
		maskTexture.draw();
		classTexture.draw(600, 0);

		backgroundTexture.scaled(0.7).regionAt(200, 520).draw(ColorF{ 0 });
		backgroundTexture.scaled(0.7).drawAt(200, 520);

		foregroundTexture.scaled(0.7).regionAt(1080, 520).draw(ColorF{ 0 });
		foregroundTexture.scaled(0.7).drawAt(1080, 520);

		inpaintTexture.drawAt(640, 520);
		{
			Transformer2D t{ Mat3x2::Scale(1.1, Vec2{640, 520}.movedBy(0, image.height() / 2)).translated((Scene::Center() - Cursor::Pos()) * 0.04) };
			foregroundTexture.drawAt(640, 520);
		}
	});
}
