cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(RayIntersection)

set(RayIntersectionBundledFilesPath
    /example/texture/uv.png
)

Siv3DAppProjectDataBundle(RayIntersection "${RayIntersectionBundledFilesPath}")
