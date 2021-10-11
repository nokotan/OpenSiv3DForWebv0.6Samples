cmake_minimum_required(VERSION 3.13)

add_executable(TestSRGBCase1)

Siv3DAppSetProjectDefaultConfig(TestSRGBCase1)

target_sources(TestSRGBCase1
    PRIVATE
        Main.cpp
)

set(TestSRGBCase1BundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
)

Siv3DAppProjectDataBundle(TestSRGBCase1 "${TestSRGBCase1BundledFilesPath}")
