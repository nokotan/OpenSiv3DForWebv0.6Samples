cmake_minimum_required(VERSION 3.13)

add_executable(Main3D)

Siv3DAppSetProjectDefaultConfig(Main3D)

target_sources(Main3D
    PRIVATE
        Main.cpp
)

set(Main3DBundledFilesPath
    /resources/engine/font/noto-emoji/NotoColorEmoji.ttf.zstdcmp
    /example/windmill.png
    /example/earth.jpg
)

Siv3DAppProjectDataBundle(Main3D "${Main3DBundledFilesPath}")
