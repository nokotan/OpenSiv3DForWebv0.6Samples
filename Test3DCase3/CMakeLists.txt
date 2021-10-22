cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(Test3DCase3)

set(Test3DCase3BundledFilesPath
    /resources/engine/font/noto-emoji/NotoColorEmoji.ttf.zstdcmp
    /example/windmill.png
    /example/texture/earth.jpg
)

Siv3DAppProjectDataBundle(Test3DCase3 "${Test3DCase3BundledFilesPath}")
