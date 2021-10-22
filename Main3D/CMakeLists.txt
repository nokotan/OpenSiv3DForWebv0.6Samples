cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(Main3D)

set(Main3DBundledFilesPath
    /resources/engine/font/noto-emoji/NotoColorEmoji.ttf.zstdcmp
    /example/windmill.png
    /example/earth.jpg
)

Siv3DAppProjectDataBundle(Main3D "${Main3DBundledFilesPath}")
