cmake_minimum_required(VERSION 3.13)

add_executable(Terrain)

Siv3DAppSetProjectDefaultConfig(Terrain)

target_sources(Terrain
    PRIVATE
        Main.cpp
)

set(TerrainBundledFilesPath
    /example/shader/essl/
    /example/texture/
    /example/particle.png
)

Siv3DAppProjectDataBundle(Terrain "${TerrainBundledFilesPath}")
