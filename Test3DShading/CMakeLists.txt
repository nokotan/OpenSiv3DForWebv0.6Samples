cmake_minimum_required(VERSION 3.13)

add_executable(Test3DShading)

Siv3DAppSetProjectDefaultConfig(Test3DShading)

target_sources(Test3DShading
    PRIVATE
        Main.cpp
)

set(Test3DShadingBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
)

Siv3DAppProjectDataBundle(Test3DShading "${Test3DShadingBundledFilesPath}")
