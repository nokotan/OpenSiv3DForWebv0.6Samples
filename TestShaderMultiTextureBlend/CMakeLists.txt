cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(TestShaderMultiTextureBlend)

set(TestShaderMultiTextureBlendBundledFilesPath
    /resources/engine/font/noto-emoji/NotoColorEmoji.ttf.zstdcmp
    /example/shader/
    /example/windmill.png
)

Siv3DAppProjectDataBundle(TestShaderMultiTextureBlend "${TestShaderMultiTextureBlendBundledFilesPath}")
