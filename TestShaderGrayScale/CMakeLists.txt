cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(TestShaderGrayScale)

set(TestShaderGrayScaleBundledFilesPath
    /example/shader/
    /example/windmill.png
)

Siv3DAppProjectDataBundle(TestShaderGrayScale "${TestShaderGrayScaleBundledFilesPath}")
