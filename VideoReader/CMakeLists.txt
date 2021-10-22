cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(VideoReader)

set(VideoReaderBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
    /example/video/river.mp4
)

Siv3DAppProjectDataBundle(VideoReader "${VideoReaderBundledFilesPath}")
