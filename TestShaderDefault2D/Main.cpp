# include <Siv3D.hpp>

void Main()
{
    const VertexShader vs2D = HLSL{ U"example/shader/hlsl/default2d.hlsl", U"VS" }
        | GLSL{ U"example/shader/glsl/default2d.vert", {{U"VSConstants2D", 0}} }
        | ESSL{ U"example/shader/essl/default2d.vert", {{U"VSConstants2D", 0}} }
        | WGSL{ U"example/shader/wgsl/default2d.vert.wgsl", {{U"VSConstants2D", 0}} };

    const PixelShader ps2DShape = HLSL{ U"example/shader/hlsl/default2d.hlsl", U"PS_Shape" }
        | GLSL{ U"example/shader/glsl/default2d_shape.frag", {{U"PSConstants2D", 0}} }
        | ESSL{ U"example/shader/essl/default2d_shape.frag", {{U"PSConstants2D", 0}} }
        | WGSL{ U"example/shader/wgsl/default2d_shape.frag.wgsl", {{U"PSConstants2D", 0}} };

    const PixelShader ps2DTexture = HLSL{ U"example/shader/hlsl/default2d.hlsl", U"PS_Texture" }
        | GLSL{ U"example/shader/glsl/default2d_texture.frag", {{U"PSConstants2D", 0}} }
        | ESSL{ U"example/shader/essl/default2d_texture.frag", {{U"PSConstants2D", 0}} }
        | WGSL{ U"example/shader/wgsl/default2d_texture.frag.wgsl", {{U"PSConstants2D", 0}} };

    if ((not vs2D) || (not ps2DShape) || (not ps2DTexture))
    {
        return;
    }

    const Texture texure{ U"example/windmill.png" };

    while (System::Update())
    {
        {
			const ScopedCustomShader2D shader{ vs2D, ps2DShape };
			Circle{ 600, 400, 100 }.draw(Palette::Orange);
		}

		{
			const ScopedCustomShader2D shader{ vs2D, ps2DTexture };
			texure.draw();
		}
    }
}