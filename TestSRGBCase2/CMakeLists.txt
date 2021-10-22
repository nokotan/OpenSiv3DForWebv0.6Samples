cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(TestSRGBCase2)

set(TestSRGBCase2BundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
)

Siv3DAppProjectDataBundle(TestSRGBCase2 "${TestSRGBCase2BundledFilesPath}")
