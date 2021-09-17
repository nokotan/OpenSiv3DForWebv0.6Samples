# include <Siv3D.hpp>

// 渦巻き効果のピクセルシェーダ用の
// 定数バッファ (PS_1)
struct Swirl
{
	// 回転
	float angle;
};

void Main()
{
	Scene::SetResizeMode(ResizeMode::Keep);
	
    // ゲームの描画用のレンダーテクスチャ
	MSRenderTexture renderTexture{ Scene::Size() };

	// グレースケール化するピクセルシェーダ
	const PixelShader psGrayscale = HLSL{ U"example/shader/hlsl/grayscale.hlsl", U"PS" }
		| GLSL{ U"example/shader/glsl/grayscale.frag", {{U"PSConstants2D", 0}} }
		| ESSL{ U"example/shader/essl/grayscale.frag", {{U"PSConstants2D", 0}} };

	if (not psGrayscale)
	{
		throw Error{ U"Failed to load a shader file" };
	}

	// 渦巻き効果のピクセルシェーダ
	const PixelShader psSwirl = HLSL{ U"example/shader/hlsl/swirl.hlsl", U"PS" }
		| GLSL{ U"example/shader/glsl/swirl.frag", {{U"PSConstants2D", 0}, {U"Swirl", 1}} }
		| ESSL{ U"example/shader/essl/swirl.frag", {{U"PSConstants2D", 0}, {U"Swirl", 1}} };

	if (not psSwirl)
	{
		throw Error{ U"Failed to load a shader file" };
	}

	// 渦巻き効果のピクセルシェーダ用の定数バッファ
	ConstantBuffer<Swirl> cb;

	// ガウスぼかしの中間で使うレンダーテクスチャ
	RenderTexture rtA{ renderTexture.size() }, rtB{ renderTexture.size() };
	RenderTexture rtA4{ renderTexture.size() / 4 }, rtB4{ renderTexture.size() / 4 };
	RenderTexture rtA8{ renderTexture.size() / 8 }, rtB8{ renderTexture.size() / 8 };

	// ゲーム画面に適用するエフェクト
	size_t effectIndex = 0;

	// 背景色
	constexpr ColorF backgroundColor{ 0.3, 0.4, 0.5 };

	// ブロックのサイズ
	constexpr Size blockSize{ 40, 20 };

	// ブロックの配列
	Array<Rect> blocks;

	// 横 (Scene::Width() / blockSize.x) 個、縦 5 個のブロックを配列に追加する
	for (auto p : step(Size{ (Scene::Width() / blockSize.x), 5 }))
	{
		blocks << Rect{ (p.x * blockSize.x), (60 + p.y * blockSize.y), blockSize };
	}

	// ボールの速さ
	constexpr double speed = 480.0;

	// ボールの速度
	Vec2 ballVelocity{ 0, -speed };

	// ボール
	Circle ball{ 400, 400, 8 };

	// 自動プレイ用のパラメータ
	double paddleCenter = 400;
	double randomOffset = 0.0;

    Platform::Web::System::SetMainLoop([&]()
    {
		System::Update();

        // 自動プレイ
		paddleCenter = Math::Damp(paddleCenter, ball.x + ballVelocity.x * 1.2 + randomOffset, 0.9, Scene::DeltaTime());

		// パドル
		const RectF paddle{ Arg::center(paddleCenter, 500), 120, 10 };

		// ボールを移動
		ball.moveBy(ballVelocity * Scene::DeltaTime());

		// ブロックを順にチェック
		for (auto it = blocks.begin(); it != blocks.end(); ++it)
		{
			// ボールとブロックが交差していたら
			if (it->intersects(ball))
			{
				// ボールの向きを反転する
				(it->bottom().intersects(ball) || it->top().intersects(ball) ? ballVelocity.y : ballVelocity.x) *= -1;

				// ブロックを配列から削除（イテレータが無効になるので注意）
				blocks.erase(it);

				// これ以上チェックしない  
				break;
			}
		}

		// 天井にぶつかったらはね返る
		if (ball.y < 0 && ballVelocity.y < 0)
		{
			ballVelocity.y *= -1;
		}

		// 左右の壁にぶつかったらはね返る
		if ((ball.x < 0 && ballVelocity.x < 0) || (Scene::Width() < ball.x && ballVelocity.x > 0))
		{
			ballVelocity.x *= -1;
		}

		// パドルにあたったらはね返る
		if (ballVelocity.y > 0 && paddle.intersects(ball))
		{
			// パドルの中心からの距離に応じてはね返る向きを変える
			ballVelocity = Vec2((ball.x - paddle.center().x) * 10, -ballVelocity.y).setLength(speed);
			randomOffset = Random(-40, 40);
		}

		// レンダーテクスチャをクリア
		renderTexture.clear(backgroundColor);
		{
			// レンダーターゲットを renderTexture に設定
			const ScopedRenderTarget2D target{ renderTexture };

			for (auto y : Range(1, 5))
			{
				Line{ 0, y * 100, 800, y * 100 }.draw(1, Palette::Gray);
			}

			for (auto x : Range(1, 7))
			{
				Line{ x * 100, 0, x * 100, 600 }.draw(1, Palette::Gray);
			}

			// すべてのブロックを描画する
			for (const auto& block : blocks)
			{
				block.stretched(-1).draw(HSV{ block.y - 40 });
			}

			// ボールを描く
			ball.draw();

			// パドルを描く
			paddle.draw();
		}

		// resolve のために描画を完了させる
		Graphics2D::Flush();

		// multi-sample のテクスチャを resolve して
		// multi-sample ではない、描画可能なテクスチャを得る
		renderTexture.resolve();

		if (effectIndex == 0) // ゲーム画面をそのまま描画
		{
			renderTexture.draw();
		}
		else if (effectIndex == 1) // ゲーム画面をグレースケール化して描画
		{
			// グレースケール化するピクセルシェーダを開始
			const ScopedCustomShader2D shader(psGrayscale);
			renderTexture.draw();
		}
		else if (effectIndex == 2) // ゲーム画面を渦巻き効果で描画
		{
			cb->angle = static_cast<float>(Math::Sin(Scene::Time()) * 240_deg);

			// 定数バッファを設定
			Graphics2D::SetConstantBuffer(ShaderStage::Pixel, 1, cb);

			// 渦巻き効果のシェーダを開始
			const ScopedCustomShader2D shader(psSwirl);
			renderTexture.draw();
		}
		else if (effectIndex == 3) // ゲーム画面をガウスぼかしで描画
		{
			// [オリジナル]->[ガウスぼかし]->[1/4サイズ]->[ガウスぼかし]
			Shader::GaussianBlur(renderTexture, rtB, rtA);
			Shader::Downsample(rtA, rtA4);
			Shader::GaussianBlur(rtA4, rtB4, rtA4);
			Shader::Downsample(rtA4, rtA8);
			Shader::GaussianBlur(rtA8, rtB8, rtA8);

			rtA8.scaled(8).draw();
		}

		// エフェクトの種類の選択
		SimpleGUI::RadioButtons(effectIndex, { U"Default", U"Grayscale", U"Swirl", U"GaussianBlur" }, Vec2{ 10, 10 });
    });
}