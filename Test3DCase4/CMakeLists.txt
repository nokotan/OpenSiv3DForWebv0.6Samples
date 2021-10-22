cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(Test3DCase4)

set(Test3DCase4BundledFilesPath
    /resources/engine/font/noto-emoji/NotoColorEmoji.ttf.zstdcmp
    /example/windmill.png
    /example/texture/earth.jpg
)

Siv3DAppProjectDataBundle(Test3DCase4 "${Test3DCase4BundledFilesPath}")
