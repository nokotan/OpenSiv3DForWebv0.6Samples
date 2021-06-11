cmake_minimum_required(VERSION 3.13)

add_executable(QRCode)

Siv3DAppSetProjectDefaultConfig(QRCode)

target_sources(QRCode
    PRIVATE
        Main.cpp
)
