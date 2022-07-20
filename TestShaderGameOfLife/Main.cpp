# include <Siv3D.hpp>

// 定数バッファ (PS_1)
struct GameOfLife
{
	Float2 pixelSize;
};

void Main()
{
    // ウィンドウを 1280x720 にリサイズ
	Window::Resize(1280, 720);

	// セルの数 (1280x720)
	constexpr Size FieldSize{ 1280, 720 };

	const PixelShader ps = HLSL{ U"example/shader/hlsl/game_of_life.hlsl", U"PS" }
		| GLSL{ U"example/shader/glsl/game_of_life.frag", {{U"PSConstants2D", 0}, {U"GameOfLife", 1}} }
		| ESSL{ U"example/shader/essl/game_of_life.frag", {{U"PSConstants2D", 0}, {U"GameOfLife", 1}} }
		| WGSL{ U"example/shader/wgsl/game_of_life.frag.wgsl", {{U"PSConstants2D", 0}, {U"GameOfLife", 1}} };

	if (not ps)
	{
		throw Error{ U"Failed to load a shader file" };
	}

	// 定数バッファ
	const ConstantBuffer<GameOfLife> cb{ { (Float2{1.0f, 1.0f} / FieldSize) } };

	// レンダーテクスチャ 0
	RenderTexture renderTexture0{ Image{FieldSize, Arg::generator = []() { return Color(RandomBool() * 255); }} };

	// レンダーテクスチャ 1
	RenderTexture renderTexture1{ FieldSize, ColorF{0.0} };

    while (System::Update())
    {
        {
			// テクスチャフィルタなし
			const ScopedRenderStates2D sampler(SamplerState::ClampNearest);

			// 現在の状態を画面に描く
			renderTexture0.draw(ColorF{ 0.0, 1.0, 0.0 });

			{
				// ライフゲーム用のシェーダ
				Graphics2D::SetConstantBuffer(ShaderStage::Pixel, 1, cb);
				const ScopedCustomShader2D shader{ ps };

				// 更新後の状態を描く rt1 に描く
				const ScopedRenderTarget2D target{ renderTexture1 };
				renderTexture0.draw();
			}
		}

		// rt0 と rt1 を入れ替える
		std::swap(renderTexture0, renderTexture1);
    }
}