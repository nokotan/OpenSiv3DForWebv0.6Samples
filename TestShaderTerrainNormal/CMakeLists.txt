cmake_minimum_required(VERSION 3.13)

add_executable(TestShaderTerrainNormal)

Siv3DAppSetProjectDefaultConfig(TestShaderTerrainNormal)

target_sources(TestShaderTerrainNormal
    PRIVATE
        Main.cpp
)

set(TestShaderTerrainNormalBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
    /example/shader/
    /example/texture/uv.png
    /example/texture/grass.jpg
    /example/texture/rock.jpg
    /example/particle.png
)

Siv3DAppProjectDataBundle(TestShaderTerrainNormal "${TestShaderTerrainNormalBundledFilesPath}")
