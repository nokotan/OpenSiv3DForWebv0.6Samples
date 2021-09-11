# include <Siv3D.hpp> // OpenSiv3D v0.6

void Main()
{
	bool acceptFiles = true;
	bool acceptText = false; // デフォルトではテキストのドロップは受け付けない

	Platform::Web::System::SetMainLoop([&]
	{
		System::Update();

		// ファイルパスがドロップされた
		if (DragDrop::HasNewFilePaths())
		{
			// アイテムを取得
			for (const auto& dropped : DragDrop::GetDroppedFilePaths())
			{
				Print << U"path:";
				Print << dropped.path;
				Print << dropped.timeMillisec << U" " << dropped.pos;
			}
		}

		// テキストがドロップされた
		if (DragDrop::HasNewText())
		{
			// アイテムを取得
			for (const auto& dropped : DragDrop::GetDroppedText())
			{
				Print << U"text:";
				Print << dropped.text;
				Print << dropped.timeMillisec << U" " << dropped.pos;
			}
		}

		// 何かをドラッグ中
		if (const auto drag = DragDrop::DragOver())
		{
			const Vec2 pos = drag->cursorPos;

			Circle{ pos, 80 }.draw(Palette::Gray);
			
			// ドラッグしているアイテムの種類
			if (drag->itemType == DragItemType::FilePaths)
			{
				PutText(U"Files", pos.movedBy(80, 80));
			}
			else
			{
				PutText(U"Text", pos.movedBy(80, 80));
			}
		}

		if (SimpleGUI::CheckBox(acceptFiles, U"Accept files", Vec2{ 400, 20 }))
		{
			DragDrop::AcceptFilePaths(acceptFiles);
		}

		if (SimpleGUI::CheckBox(acceptText, U"Accept text", Vec2{ 400, 60 }))
		{
			DragDrop::AcceptText(acceptText);
		}
	});
}