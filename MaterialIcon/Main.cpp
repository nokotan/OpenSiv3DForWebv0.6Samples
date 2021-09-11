# include <Siv3D.hpp>

void Main()
{
    const Font font{ 30, Typeface::Medium };
    const Font iconFont{ 30, Typeface::Icon_MaterialDesign };
    font.addFallback(iconFont);

    const Array<String> items = {
      U"\xF00E8  更新",
      U"\xF11E8  編集",
      U"\xF09FA  キーボード設定",
      U"\xF173B  操作方法"
    };

    Platform::Web::System::SetMainLoop([&]()
    {
        System::Update();
        
        for (auto [i, item] : Indexed(items))
		{
			const RoundRect rect{ 40, 40 + i * 80.0, 320, 60, 8 };

			rect.draw(ColorF{ 0.99, 0.96, 0.93 });

			font(item)
				.draw(55, 48 + i * 80.0, ColorF{ 0.25 });
		}
    });
}