cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(PeriodicMinusToPlus)

set(PeriodicMinusToPlusBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansCJK-Regular.ttc.zstdcmp
    /resources/engine/font/noto-emoji/NotoColorEmoji.ttf.zstdcmp
    /resources/engine/font/mplus/mplus-1p-regular.ttf.zstdcmp
    /example/windmill.png
)

Siv3DAppProjectDataBundle(PeriodicMinusToPlus "${PeriodicMinusToPlusBundledFilesPath}")
