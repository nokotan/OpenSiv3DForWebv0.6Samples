cmake_minimum_required(VERSION 3.13)

add_executable(Test3DShading)

Siv3DAppSetProjectDefaultConfig(Test3DShading)

target_sources(Test3DShading
    PRIVATE
        Main.cpp
)
