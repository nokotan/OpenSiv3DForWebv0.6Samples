# include <Siv3D.hpp>

// 定数バッファ (PS_1)
struct Swirl
{
	// 回転
	float angle;
};

void Main()
{
    const Texture windmill{ U"example/windmill.png" };
	const PixelShader ps = HLSL{ U"example/shader/hlsl/swirl.hlsl", U"PS" }
		| GLSL{ U"example/shader/glsl/swirl.frag", {{U"PSConstants2D", 0}, {U"Swirl", 1}} }
		| ESSL{ U"example/shader/essl/swirl.frag", {{U"PSConstants2D", 0}, {U"Swirl", 1}} }
		| WGSL{ U"example/shader/wgsl/swirl.frag.wgsl", {{U"PSConstants2D", 0}, {U"Swirl", 1}} };

	if (not ps)
	{
		throw Error{ U"Failed to load a shader file" };
	}

	// 定数バッファ
	ConstantBuffer<Swirl> cb;

    while (System::Update())
    {
        cb->angle = static_cast<float>(Math::Sin(Scene::Time()) * 720_deg);

		{
			// 定数バッファを、ピクセルシェーダの定数バッファインデックス 1 に設定
			Graphics2D::SetConstantBuffer(ShaderStage::Pixel, 1, cb);

			// 渦巻き効果のシェーダを開始
			const ScopedCustomShader2D shader{ ps };
			windmill.draw(10, 10);
		}
    }
}