cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(Microphone)

set(MicrophoneBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
)

Siv3DAppProjectDataBundle(Microphone "${MicrophoneBundledFilesPath}")
