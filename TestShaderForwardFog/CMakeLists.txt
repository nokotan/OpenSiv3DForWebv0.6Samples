cmake_minimum_required(VERSION 3.13)

add_executable(TestShaderForwardFog)

Siv3DAppSetProjectDefaultConfig(TestShaderForwardFog)

target_sources(TestShaderForwardFog
    PRIVATE
        Main.cpp
)

set(TestShaderForwardFogBundledFilesPath
    /example/shader/
    /example/texture/uv.png
)

Siv3DAppProjectDataBundle(TestShaderForwardFog "${TestShaderForwardFogBundledFilesPath}")
