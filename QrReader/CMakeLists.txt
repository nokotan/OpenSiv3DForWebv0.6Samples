cmake_minimum_required(VERSION 3.13)

add_executable(QRReader)

Siv3DAppSetProjectDefaultConfig(QRReader)

target_sources(QRReader
    PRIVATE
        Main.cpp
)
