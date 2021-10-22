cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(TestShaderDefault3D)

set(TestShaderDefault3DBundledFilesPath
    /example/shader/
    /example/windmill.png
    /example/texture/uv.png
)

Siv3DAppProjectDataBundle(TestShaderDefault3D "${TestShaderDefault3DBundledFilesPath}")
