# include <Siv3D.hpp>

void Main()
{
    const Texture windmill{ U"example/windmill.png" };
	const PixelShader ps = HLSL{ U"example/shader/hlsl/posterize.hlsl", U"PS" }
		| GLSL{ U"example/shader/glsl/posterize.frag", {{U"PSConstants2D", 0}} }
		| ESSL{ U"example/shader/essl/posterize.frag", {{U"PSConstants2D", 0}} }
		| WGSL{ U"example/shader/wgsl/posterize.frag.wgsl", {{U"PSConstants2D", 0}} };

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