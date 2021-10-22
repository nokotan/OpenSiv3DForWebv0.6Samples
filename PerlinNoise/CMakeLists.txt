cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(PerlinNoise)

set(PerlinNoiseBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
)

Siv3DAppProjectDataBundle(PerlinNoise "${PerlinNoiseBundledFilesPath}")
