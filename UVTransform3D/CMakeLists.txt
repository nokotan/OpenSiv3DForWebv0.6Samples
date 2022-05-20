cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(UVTransform3D)

set(UVTransform3DBundledFilesPath
    /example/texture/ground.jpg
    /example/texture/uv.png
    /example/obj
)

Siv3DAppProjectDataBundle(UVTransform3D "${UVTransform3DBundledFilesPath}")
