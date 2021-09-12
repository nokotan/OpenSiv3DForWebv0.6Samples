cmake_minimum_required(VERSION 3.13)

add_executable(ViewFrustum)

Siv3DAppSetProjectDefaultConfig(ViewFrustum)

target_sources(ViewFrustum
    PRIVATE
        Main.cpp
)

set(ViewFrustumBundledFilesPath
    /example/texture/uv.png
)

Siv3DAppProjectDataBundle(ViewFrustum "${ViewFrustumBundledFilesPath}")
