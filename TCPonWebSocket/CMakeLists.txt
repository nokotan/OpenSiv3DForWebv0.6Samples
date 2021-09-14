cmake_minimum_required(VERSION 3.13)

add_executable(TCPonWebSocket)

Siv3DAppSetProjectDefaultConfig(TCPonWebSocket)

target_sources(TCPonWebSocket
    PRIVATE
        Main.cpp
)
