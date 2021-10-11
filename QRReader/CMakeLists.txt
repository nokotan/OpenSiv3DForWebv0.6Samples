cmake_minimum_required(VERSION 3.13)

add_executable(QRReader)

Siv3DAppSetProjectDefaultConfig(QRReader)

target_sources(QRReader
    PRIVATE
        Main.cpp
)

set(QRReaderBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
)

Siv3DAppProjectDataBundle(QRReader "${QRReaderBundledFilesPath}")
