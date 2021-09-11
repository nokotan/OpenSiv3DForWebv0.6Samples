cmake_minimum_required(VERSION 3.13)

add_executable(QrReader)

Siv3DAppSetProjectDefaultConfig(QrReader)

target_sources(QrReader
    PRIVATE
        Main.cpp
)
