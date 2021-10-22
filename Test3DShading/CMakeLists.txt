cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(Test3DShading)

set(Test3DShadingBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
)

Siv3DAppProjectDataBundle(Test3DShading "${Test3DShadingBundledFilesPath}")
