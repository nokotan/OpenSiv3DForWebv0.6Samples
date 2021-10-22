cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(TestShaderForwardFog)

set(TestShaderForwardFogBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
    /example/shader/
    /example/texture/uv.png
)

Siv3DAppProjectDataBundle(TestShaderForwardFog "${TestShaderForwardFogBundledFilesPath}")
