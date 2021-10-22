cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(EmpoweredAudio)

set(EmpoweredAudioBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
)

Siv3DAppProjectDataBundle(EmpoweredAudio "${EmpoweredAudioBundledFilesPath}")
