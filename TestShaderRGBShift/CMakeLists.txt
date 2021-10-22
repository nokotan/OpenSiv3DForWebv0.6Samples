cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(TestShaderRGBShift)

set(TestShaderRGBShiftBundledFilesPath
    /example/shader/
    /example/windmill.png
)

Siv3DAppProjectDataBundle(TestShaderRGBShift "${TestShaderRGBShiftBundledFilesPath}")
