cmake_minimum_required(VERSION 3.13)

add_executable(TestSRGBCase2)

Siv3DAppSetProjectDefaultConfig(TestSRGBCase2)

target_sources(TestSRGBCase2
    PRIVATE
        Main.cpp
)

set(TestSRGBCase2BundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
)

Siv3DAppProjectDataBundle(TestSRGBCase2 "${TestSRGBCase2BundledFilesPath}")
