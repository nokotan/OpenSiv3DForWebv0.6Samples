cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(QRReader)

set(QRReaderBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
)

Siv3DAppProjectDataBundle(QRReader "${QRReaderBundledFilesPath}")
