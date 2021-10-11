# include <Siv3D.hpp>

void Main()
{
    Scene::SetResizeMode(ResizeMode::Keep);
	  Scene::Resize(1280, 720);
    Scene::SetBackground(ColorF{ 0.8, 0.9, 1.0 });
    
    const VertexShader vs
        = HLSL{ U"example/shader/hlsl/soft_shape.hlsl" }
        | GLSL{ U"example/shader/glsl/soft_shape.vert", { { U"VSConstants2D", 0 }, { U"SoftShape", 1 } }}
        | ESSL{ U"example/shader/essl/soft_shape.vert", { { U"VSConstants2D", 0 }, { U"SoftShape", 1 } }};

    if (!vs)
    {
        throw(U"Failed to load shader file.");
    }

    ConstantBuffer<float> cb;

    while (System::Update())
    {
        
        
          cb = static_cast<float>(Scene::Time());
        Graphics2D::SetConstantBuffer(ShaderStage::Vertex, 1, cb);
        
        {
          ScopedCustomShader2D shader{ vs };
          Graphics2D::DrawTriangles(360);
        }
  });
}