cmake_minimum_required(VERSION 3.13)

add_executable(VideoReader)

Siv3DAppSetProjectDefaultConfig(VideoReader)

target_sources(VideoReader
    PRIVATE
        Main.cpp
)
