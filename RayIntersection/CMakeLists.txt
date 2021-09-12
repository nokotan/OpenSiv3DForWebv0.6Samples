cmake_minimum_required(VERSION 3.13)

add_executable(RayIntersection)

Siv3DAppSetProjectDefaultConfig(RayIntersection)

target_sources(RayIntersection
    PRIVATE
        Main.cpp
)

set(RayIntersectionBundledFilesPath
    /example/texture/uv.png
)

Siv3DAppProjectDataBundle(RayIntersection "${RayIntersectionBundledFilesPath}")
