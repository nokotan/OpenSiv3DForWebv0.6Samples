# include <Siv3D.hpp>

void Main()
{
	Scene::SetResizeMode(ResizeMode::Keep);
    // ウィンドウを 960x600 にリサイズ
	Scene::Resize(960, 600);

	// シーンの背景色を淡い水色に設定
	Scene::SetBackground(ColorF(0.8, 0.9, 1.0));

	const Texture emoji{ Emoji::CreateSilhouetteImage(U"🍎"), TextureDesc::Mipped };
	const Texture windmill{ U"example/windmill.png", TextureDesc::Mipped };

	const PixelShader ps = HLSL{ U"example/shader/hlsl/multi_texture_mask.hlsl", U"PS" }
		| GLSL{ U"example/shader/glsl/multi_texture_mask.frag", {{U"PSConstants2D", 0}} }
		| ESSL{ U"example/shader/essl/multi_texture_mask.frag", {{U"PSConstants2D", 0}} }
		| WGSL{ U"example/shader/wgsl/multi_texture_mask.frag.wgsl", {{U"PSConstants2D", 0}} };

	if (not ps)
	{
		throw Error{ U"Failed to load a shader file" };
	}

	// レンダーテクスチャを作成
	const RenderTexture renderTexture{ 480, 320 };

    while (System::Update())
    {
        // レンダーテクスチャをクリア
		renderTexture.clear(ColorF(0.0, 1.0));
		{
			// レンダーターゲットを renderTexture に設定
			const ScopedRenderTarget2D rt(renderTexture);
			emoji.scaled(2).rotated(Scene::Time() * 60_deg).drawAt(renderTexture.size() / 2);
		}

		// 描画された renderTexture を表示
		renderTexture.draw(0, 140);

		// renderTexture をピクセルシェーダのテクスチャスロット [1] にセット 
		Graphics2D::SetPSTexture(1, renderTexture);
		{
			// マルチテクスチャによるマスクのシェーダを開始
			const ScopedCustomShader2D shader{ ps };
			windmill.draw(480, 140);
		}
    }
}