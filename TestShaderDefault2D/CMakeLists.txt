cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(TestShaderDefault2D)

set(TestShaderDefault2DBundledFilesPath
    /example/shader/
    /example/windmill.png
)

Siv3DAppProjectDataBundle(TestShaderDefault2D "${TestShaderDefault2DBundledFilesPath}")
