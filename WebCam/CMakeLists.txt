cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(WebCam)

set(WebCamBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
)

Siv3DAppProjectDataBundle(WebCam "${WebCamBundledFilesPath}")
