# include <Siv3D.hpp>

SIV3D_SET(EngineOption::Renderer::WebGL2)

void ShowStatus(const VideoReader& video)
{
	Print << U"file: " << FileSystem::FileName(video.path());
	Print << U"size: " << video.getSize();
	Print << U"fps: " << video.getFPS();
	Print << U"time: {:.2f}s/{:.2f}s"_fmt(video.getPosSec(), video.getLengthSec());
	Print << U"progress: {:.0f} %"_fmt(video.getProgress() * 100.0);
	Print << U"frame: {}/{}"_fmt(video.getCurrentFrameIndex(), video.getFrameCount());
	Print << U"reachedEnd: " << video.reachedEnd();
}

void Main()
{
	Scene::SetResizeMode(ResizeMode::Keep);
	Scene::Resize(1280, 720);

	VideoReader video{ U"example/video/river.mp4" };

	if (!video)
	{
		throw Error{ U"Failed to load the video" };
	}

	Image frameImage;
	video.readFrame(frameImage);
	DynamicTexture frameTexture{ frameImage };

	const double frameDeltaSec = video.getFrameDeltaSec();
	double frameTimeSec = 0.0;
	bool playing = true;

	Platform::Web::System::SetMainLoop([&]
	{
		System::Update();

		ClearPrint();
		ShowStatus(video);

		if (playing)
		{
			frameTimeSec += Scene::DeltaTime();
		}

		if (frameDeltaSec <= frameTimeSec)
		{
			video.readFrame(frameImage);
			frameTexture.fill(frameImage);
			frameTimeSec -= frameDeltaSec;
		}

		frameTexture.draw();

		if (SimpleGUI::Button(U"Reset", Vec2{ 40, 640 }))
		{
			video.setCurrentFrameIndex(0);
			video.readFrame(frameImage);
			frameTexture.fill(frameImage);
			frameTimeSec = 0.0;
		}

		if (SimpleGUI::Button((playing ? U"■" : U"▶"), Vec2{ 160, 640 }))
		{
			playing = !playing;
			frameTimeSec = 0.0;
		}
	});
}
