cmake_minimum_required(VERSION 3.13)

add_executable(TestShaderMultiTextureBlend)

Siv3DAppSetProjectDefaultConfig(TestShaderMultiTextureBlend)

target_sources(TestShaderMultiTextureBlend
    PRIVATE
        Main.cpp
)

set(TestShaderMultiTextureBlendBundledFilesPath
    /example/shader/
    /example/windmill.png
)

Siv3DAppProjectDataBundle(TestShaderMultiTextureBlend "${TestShaderMultiTextureBlendBundledFilesPath}")
