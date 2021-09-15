cmake_minimum_required(VERSION 3.13)

add_executable(TCPonWebSocket)

Siv3DAppSetProjectDefaultConfig(TCPonWebSocket)

target_sources(TCPonWebSocket
    PRIVATE
        Main.cpp
)

target_link_options(TCPonWebSocket
    PRIVATE
        "SHELL:-s WEBSOCKET_URL=\"wss:#wss-sample-server.herokuapp.com\""
)
