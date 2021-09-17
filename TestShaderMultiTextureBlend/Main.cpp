# include <Siv3D.hpp>

void Main()
{
	Scene::SetResizeMode(ResizeMode::Keep);
	
    const Texture emoji{ U"🐈"_emoji };
	const Texture windmill{ U"example/windmill.png", TextureDesc::Mipped };
	const PixelShader ps = HLSL{ U"example/shader/hlsl/multi_texture_blend.hlsl", U"PS" }
		| GLSL{ U"example/shader/glsl/multi_texture_blend.frag", {{U"PSConstants2D", 0}} }
		| ESSL{ U"example/shader/essl/multi_texture_blend.frag", {{U"PSConstants2D", 0}} };

	if (not ps)
	{
		throw Error{ U"Failed to load a shader file" };
	}

    Platform::Web::System::SetMainLoop([&]()
    {
		System::Update();

        // windmill をピクセルシェーダのテクスチャスロット [1] にセット 
		Graphics2D::SetPSTexture(1, windmill);
		{
			// マルチテクスチャによるブレンドのシェーダを開始
			const ScopedCustomShader2D shader{ ps };
			emoji.scaled(2).drawAt(Scene::Center());
		}
    });
}