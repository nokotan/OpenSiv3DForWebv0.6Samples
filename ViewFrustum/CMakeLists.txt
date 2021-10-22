cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(ViewFrustum)

set(ViewFrustumBundledFilesPath
    /example/texture/uv.png
)

Siv3DAppProjectDataBundle(ViewFrustum "${ViewFrustumBundledFilesPath}")
