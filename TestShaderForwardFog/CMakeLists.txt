cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(TestShaderForwardFog)

set(TestShaderForwardFogBundledFilesPath
    /example/shader/
    /example/texture/uv.png
)

Siv3DAppProjectDataBundle(TestShaderForwardFog "${TestShaderForwardFogBundledFilesPath}")
