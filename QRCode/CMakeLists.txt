cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(QRCode)

set(QRCodeBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
)

Siv3DAppProjectDataBundle(QRCode "${QRCodeBundledFilesPath}")
