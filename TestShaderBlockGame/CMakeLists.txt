cmake_minimum_required(VERSION 3.13)

add_executable(TestShaderBlockGame)

Siv3DAppSetProjectDefaultConfig(TestShaderBlockGame)

target_sources(TestShaderBlockGame
    PRIVATE
        Main.cpp
)

set(TestShaderBlockGameBundledFilesPath
    /example/shader/
    /example/windmill.png
)

Siv3DAppProjectDataBundle(TestShaderBlockGame "${TestShaderBlockGameBundledFilesPath}")
