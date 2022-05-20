cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(RoundedBox)

set(RoundedBoxBundledFilesPath
    /example/shader/
    /example/texture/uv.png
    /example/texture/wood.jpg
)

Siv3DAppProjectDataBundle(RoundedBox "${RoundedBoxBundledFilesPath}")
