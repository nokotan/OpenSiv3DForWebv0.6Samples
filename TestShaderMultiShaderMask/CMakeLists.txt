cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(TestShaderMultiShaderMask)

set(TestShaderMultiShaderMaskBundledFilesPath
    /resources/engine/font/noto-emoji/NotoColorEmoji.ttf.zstdcmp
    /example/shader/
    /example/windmill.png
)

Siv3DAppProjectDataBundle(TestShaderMultiShaderMask "${TestShaderMultiShaderMaskBundledFilesPath}")
