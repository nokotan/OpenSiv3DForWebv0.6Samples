# include <Siv3D.hpp>

void Main()
{
	Scene::SetResizeMode(ResizeMode::Keep);

    const URL url = U"https://raw.githubusercontent.com/Siv3D/siv3d.docs.images/master/logo/logo.png";
	const FilePath saveFilePath = U"logo2.png";
	AsyncHTTPTask task = SimpleHTTP::SaveAsync(url, saveFilePath);
	Texture texture;

    while (System::Update())
    {
        if (task.isReady())
		{
			if (task.getResponse().isOK())
			{
				texture = Texture{ saveFilePath };
			}
			else
			{
				Print << U"Failed.";
			}
		}

		if (texture)
		{
			texture.draw();
		}
    }
}