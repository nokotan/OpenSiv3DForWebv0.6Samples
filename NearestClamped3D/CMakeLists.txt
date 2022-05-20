cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(NearestClamped3D)

set(NearestClamped3DBundledFilesPath
    /example/windmill.png
    /example/spritesheet/siv3d-kun-16.png
)

Siv3DAppProjectDataBundle(NearestClamped3D "${NearestClamped3DBundledFilesPath}")
