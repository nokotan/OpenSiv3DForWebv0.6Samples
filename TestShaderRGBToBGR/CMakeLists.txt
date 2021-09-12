cmake_minimum_required(VERSION 3.13)

add_executable(TestShaderRGBToBGR)

Siv3DAppSetProjectDefaultConfig(TestShaderRGBToBGR)

target_sources(TestShaderRGBToBGR
    PRIVATE
        Main.cpp
)

set(TestShaderRGBToBGRBundledFilesPath
    /example/shader/
    /example/windmill.png
)

Siv3DAppProjectDataBundle(TestShaderRGBToBGR "${TestShaderRGBToBGRBundledFilesPath}")
