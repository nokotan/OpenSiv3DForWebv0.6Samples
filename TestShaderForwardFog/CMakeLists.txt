cmake_minimum_required(VERSION 3.13)

add_executable(TestShaderForwardFog)

Siv3DAppSetProjectDefaultConfig(TestShaderForwardFog)

target_sources(TestShaderForwardFog
    PRIVATE
        Main.cpp
)

set(TestShaderForwardFogBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
    /example/shader/
    /example/texture/uv.png
)

Siv3DAppProjectDataBundle(TestShaderForwardFog "${TestShaderForwardFogBundledFilesPath}")
