cmake_minimum_required(VERSION 3.13)

add_executable(TestShaderRGBShift)

Siv3DAppSetProjectDefaultConfig(TestShaderRGBShift)

target_sources(TestShaderRGBShift
    PRIVATE
        Main.cpp
)

set(TestShaderRGBShiftBundledFilesPath
    /example/shader/
    /example/windmill.png
)

Siv3DAppProjectDataBundle(TestShaderRGBShift "${TestShaderRGBShiftBundledFilesPath}")
