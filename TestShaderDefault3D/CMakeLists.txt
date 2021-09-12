cmake_minimum_required(VERSION 3.13)

add_executable(TestShaderDefault3D)

Siv3DAppSetProjectDefaultConfig(TestShaderDefault3D)

target_sources(TestShaderDefault3D
    PRIVATE
        Main.cpp
)

set(TestShaderDefault3DBundledFilesPath
    /example/shader/
    /example/windmill.png
)

Siv3DAppProjectDataBundle(TestShaderDefault3D "${TestShaderDefault3DBundledFilesPath}")
