cmake_minimum_required(VERSION 3.13)

add_executable(TestShaderGrayScale)

Siv3DAppSetProjectDefaultConfig(TestShaderGrayScale)

target_sources(TestShaderGrayScale
    PRIVATE
        Main.cpp
)

set(TestShaderGrayScaleBundledFilesPath
    /example/shader/
    /example/windmill.png
)

Siv3DAppProjectDataBundle(TestShaderGrayScale "${TestShaderGrayScaleBundledFilesPath}")
