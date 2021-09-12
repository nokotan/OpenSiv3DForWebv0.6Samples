cmake_minimum_required(VERSION 3.13)

add_executable(TestShaderDefault2D)

Siv3DAppSetProjectDefaultConfig(TestShaderDefault2D)

target_sources(TestShaderDefault2D
    PRIVATE
        Main.cpp
)

set(TestShaderDefault2DBundledFilesPath
    /example/shader/
    /example/windmill.png
)

Siv3DAppProjectDataBundle(TestShaderDefault2D "${TestShaderDefault2DBundledFilesPath}")
