cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(TestShaderRGBToBGR)

set(TestShaderRGBToBGRBundledFilesPath
    /example/shader/
    /example/windmill.png
)

Siv3DAppProjectDataBundle(TestShaderRGBToBGR "${TestShaderRGBToBGRBundledFilesPath}")
