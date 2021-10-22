cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(TestShaderBlockGame)

set(TestShaderBlockGameBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
    /example/shader/
    /example/windmill.png
)

Siv3DAppProjectDataBundle(TestShaderBlockGame "${TestShaderBlockGameBundledFilesPath}")
