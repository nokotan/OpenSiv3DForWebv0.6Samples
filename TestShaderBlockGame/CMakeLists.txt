cmake_minimum_required(VERSION 3.13)

add_executable(TestShaderBlockGame)

Siv3DAppSetProjectDefaultConfig(TestShaderBlockGame)

target_sources(TestShaderBlockGame
    PRIVATE
        Main.cpp
)

set(TestShaderBlockGameBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
    /example/shader/
    /example/windmill.png
)

Siv3DAppProjectDataBundle(TestShaderBlockGame "${TestShaderBlockGameBundledFilesPath}")
