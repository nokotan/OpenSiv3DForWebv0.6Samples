# include <Siv3D.hpp>

void Main()
{
    Scene::SetResizeMode(ResizeMode::Keep);
    
    // 接続先の IPv4 アドレス（今回は自身の PC なので Localhost）
    // -s WEBSOCKET_URL オプションによって、このアドレスを上書きすることができる
	const IPv4Address ip = IPv4Address::Localhost();

	// ポート番号
	constexpr uint16 port = 443;

	bool connected = false;

	TCPClient client;

	// 接続を試行
	client.connect(ip, port);

	Window::SetTitle(U"TCPClient: Waiting for connection...");

	std::basic_string<char8> receivedBytes;
	
    HashTable<uint32, Point> serverCatPositions;

    while (System::Update())
    {
        const Point clientPlayerPos = Cursor::Pos();

		if (client.isConnected())
		{
			if (not connected) // 接続された
			{
				connected = true;

				Window::SetTitle(U"TCPClient: Connection established!");
			}

			// 送信
            JSON sendData {
                { U"x", clientPlayerPos.x },
                { U"y", clientPlayerPos.y }
            };
            auto formattedSendData = sendData.formatUTF8();
			client.send(formattedSendData.data(), formattedSendData.size());

			// 受信
			if (auto availableBytes = client.available(); availableBytes > 0) 
            {
                auto writePos = receivedBytes.size();
                receivedBytes.resize(writePos + availableBytes);
                client.read(receivedBytes.data() + writePos, availableBytes);

                while (true)
                {
                    auto pos = std::find(receivedBytes.begin(), receivedBytes.end(), '\n'); 
                    
                    if (pos == receivedBytes.end())
                    {
                        break;
                    }

                    std::basic_string_view<char8> slice { receivedBytes.begin().base(), static_cast<size_t>(pos - receivedBytes.begin()) };
                    auto data = JSON::Parse(Unicode::FromUTF8(slice));
                    auto messageType = data[U"type"].getString();
                    auto playerID = data[U"playerId"].get<uint32>();

                    if (messageType == U"updatePos")
                    {
                        serverCatPositions[playerID] = Point { data[U"x"].get<int32>(), data[U"y"].get<int32>() };
                    }
                    else if (messageType == U"removeId")
                    {
                        serverCatPositions.erase(playerID);
                    }

                    receivedBytes.erase(receivedBytes.begin(), pos + 1);
                }
            }
		}

		if (client.hasError()) // 切断/接続エラー
		{
			client.disconnect();

			connected = false;

			Window::SetTitle(U"TCPClient: Waiting for connection...");

			// 接続を再試行
			client.connect(ip, port);
		}

		Circle{ clientPlayerPos, 30 }.draw(Palette::Skyblue);

        for (const auto& [first, second] : serverCatPositions)
        {
		    Circle{ second, 30 }.draw(Palette::Orange);
        }
    }
}