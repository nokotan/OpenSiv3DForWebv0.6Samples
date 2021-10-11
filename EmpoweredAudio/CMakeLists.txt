cmake_minimum_required(VERSION 3.13)

add_executable(EmpoweredAudio)

Siv3DAppSetProjectDefaultConfig(EmpoweredAudio)

target_sources(EmpoweredAudio
    PRIVATE
        Main.cpp
)

set(EmpoweredAudioBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
)

Siv3DAppProjectDataBundle(EmpoweredAudio "${EmpoweredAudioBundledFilesPath}")
