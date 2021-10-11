cmake_minimum_required(VERSION 3.13)

add_executable(PerlinNoise)

Siv3DAppSetProjectDefaultConfig(PerlinNoise)

target_sources(PerlinNoise
    PRIVATE
        Main.cpp
)

set(PerlinNoiseBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
)

Siv3DAppProjectDataBundle(PerlinNoise "${PerlinNoiseBundledFilesPath}")
