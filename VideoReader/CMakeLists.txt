cmake_minimum_required(VERSION 3.13)

add_executable(VideoReader)

Siv3DAppSetProjectDefaultConfig(VideoReader)

target_sources(VideoReader
    PRIVATE
        Main.cpp
)

set(VideoReaderBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
    /example/video/river.mp4
)

Siv3DAppProjectDataBundle(VideoReader "${VideoReaderBundledFilesPath}")
