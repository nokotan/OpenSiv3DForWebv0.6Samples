cmake_minimum_required(VERSION 3.13)

add_executable(Main)

Siv3DAppSetProjectDefaultConfig(Main)

target_sources(Main
    PRIVATE
        Main.cpp
)
