cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(TestShaderExtractBright)

set(TestShaderExtractBrightBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
    /example/shader/
)

Siv3DAppProjectDataBundle(TestShaderExtractBright "${TestShaderExtractBrightBundledFilesPath}")
