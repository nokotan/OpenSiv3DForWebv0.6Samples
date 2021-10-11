cmake_minimum_required(VERSION 3.13)

add_executable(Main)

Siv3DAppSetProjectDefaultConfig(Main)

target_sources(Main
    PRIVATE
        Main.cpp
)

set(MainBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansCJK-Regular.ttc.zstdcmp
    /resources/engine/font/noto-emoji/NotoColorEmoji.ttf.zstdcmp
    /resources/engine/font/mplus/mplus-1p-regular.ttf.zstdcmp
    /example/windmill.png
)

Siv3DAppProjectDataBundle(Main "${MainBundledFilesPath}")
