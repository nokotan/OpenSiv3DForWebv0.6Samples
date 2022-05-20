# include <Siv3D.hpp> // OpenSiv3D v0.6.4

void Draw(const Vec2& basePos, const Array<Glyph>& glyphs)
{
	Vec2 penPos{ basePos };

	for (const auto& glyph : glyphs)
	{
		glyph.texture.draw(Math::Round(penPos + glyph.getOffset()));

		penPos.x += (glyph.xAdvance + 30);
	}
}

void Main()
{
	const Font font{ 40 };

	while (System::Update())
	{
		// v0.6.3 まで（リガチャが有効）
		Draw(Vec2{ 40, 40 }, font.getGlyphs(U"Efficient", Ligature::Yes));

		// v0.6.4（リガチャがデフォルトで無効）
		Draw(Vec2{ 40, 140 }, font.getGlyphs(U"Efficient"));
	}
}