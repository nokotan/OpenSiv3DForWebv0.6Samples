cmake_minimum_required(VERSION 3.13)

add_executable(Microphone)

Siv3DAppSetProjectDefaultConfig(Microphone)

target_sources(Microphone
    PRIVATE
        Main.cpp
)

set(MicrophoneBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
)

Siv3DAppProjectDataBundle(Microphone "${MicrophoneBundledFilesPath}")
