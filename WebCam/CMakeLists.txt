cmake_minimum_required(VERSION 3.13)

add_executable(WebCam)

Siv3DAppSetProjectDefaultConfig(WebCam)

target_sources(WebCam
    PRIVATE
        Main.cpp
)

set(WebCamBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
)

Siv3DAppProjectDataBundle(WebCam "${WebCamBundledFilesPath}")
