cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(Terrain)

set(TerrainBundledFilesPath
    /example/shader/essl/
    /example/texture/
    /example/particle.png
)

Siv3DAppProjectDataBundle(Terrain "${TerrainBundledFilesPath}")
