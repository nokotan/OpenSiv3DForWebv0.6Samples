cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(TestShaderBlockGame)

set(TestShaderBlockGameBundledFilesPath
    /example/shader/
    /example/windmill.png
)

Siv3DAppProjectDataBundle(TestShaderBlockGame "${TestShaderBlockGameBundledFilesPath}")
