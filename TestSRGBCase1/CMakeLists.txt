cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(TestSRGBCase1)

set(TestSRGBCase1BundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
)

Siv3DAppProjectDataBundle(TestSRGBCase1 "${TestSRGBCase1BundledFilesPath}")
