cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(AdditionalEmoji)

set(AdditionalEmojiBundledFilesPath
    /resources/engine/font/noto-emoji/NotoColorEmoji.ttf.zstdcmp
)

Siv3DAppProjectDataBundle(AdditionalEmoji "${AdditionalEmojiBundledFilesPath}")
