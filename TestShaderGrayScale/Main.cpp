# include <Siv3D.hpp>

void Main()
{
	Scene::SetResizeMode(ResizeMode::Keep);
	
    const Texture windmill{ U"example/windmill.png" };
	const PixelShader ps = HLSL{ U"example/shader/hlsl/rgb_to_bgr.hlsl", U"PS" }
		| GLSL{ U"example/shader/glsl/rgb_to_bgr.frag", {{U"PSConstants2D", 0}} }
		| ESSL{ U"example/shader/essl/rgb_to_bgr.frag", {{U"PSConstants2D", 0}} };

	if (not ps)
	{
		throw Error{ U"Failed to load a shader file" };
	}

    while (System::Update())
    {
        {
			// R と B を入れ替えるピクセルシェーダを開始
			const ScopedCustomShader2D shader{ ps };
			windmill.draw(10, 10);
		}
    }
}