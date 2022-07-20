# include <Siv3D.hpp>

// 定数バッファ (PS_1)
struct PoissonDisk
{
	// 1 ピクセルあたりの UV サイズ
	Float2 pixelSize;

	// サンプリング半径
	float diskRadius;
};

void Main()
{
    const Texture windmill{ U"example/windmill.png" };
	const PixelShader ps = HLSL{ U"example/shader/hlsl/poisson_disk.hlsl", U"PS" }
		| GLSL{ U"example/shader/glsl/poisson_disk.frag", {{U"PSConstants2D", 0}, {U"PoissonDisk", 1}} }
		| ESSL{ U"example/shader/essl/poisson_disk.frag", {{U"PSConstants2D", 0}, {U"PoissonDisk", 1}} }
		| WGSL{ U"example/shader/wgsl/poisson_disk.frag.wgsl", {{U"PSConstants2D", 0}, {U"PoissonDisk", 1}} };

	if (not ps)
	{
		throw Error{ U"Failed to load a shader file" };
	}

	// 定数バッファ
	ConstantBuffer<PoissonDisk> cb;
	cb->pixelSize = Float2{ 1.0, 1.0 } / windmill.size();

	// サンプリング半径
	double diskRadius = 0.0;

    while (System::Update())
    {
        // サンプリング半径をスライダーで変更
		if (SimpleGUI::Slider(U"diskRadius", diskRadius, 0.0, 8.0, Vec2{ 10, 340 }, 120, 200))
		{
			cb->diskRadius = static_cast<float>(diskRadius);
		}

		{
			// 定数バッファを、ピクセルシェーダの定数バッファインデックス 1 に設定
			Graphics2D::SetConstantBuffer(ShaderStage::Pixel, 1, cb);

			// Poisson-Disk Sampling 用のシェーダを開始
			const ScopedCustomShader2D shader{ ps };
			windmill.draw(10, 10);
		}
    }
}