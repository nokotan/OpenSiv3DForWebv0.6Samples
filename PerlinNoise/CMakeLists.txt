cmake_minimum_required(VERSION 3.13)

add_executable(PerlinNoise)

Siv3DAppSetProjectDefaultConfig(PerlinNoise)

target_sources(PerlinNoise
    PRIVATE
        Main.cpp
)
