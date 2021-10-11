cmake_minimum_required(VERSION 3.13)

add_executable(TestShaderMultiShaderMask)

Siv3DAppSetProjectDefaultConfig(TestShaderMultiShaderMask)

target_sources(TestShaderMultiShaderMask
    PRIVATE
        Main.cpp
)

set(TestShaderMultiShaderMaskBundledFilesPath
    /resources/engine/font/noto-emoji/NotoColorEmoji.ttf.zstdcmp
    /example/shader/
    /example/windmill.png
)

Siv3DAppProjectDataBundle(TestShaderMultiShaderMask "${TestShaderMultiShaderMaskBundledFilesPath}")
