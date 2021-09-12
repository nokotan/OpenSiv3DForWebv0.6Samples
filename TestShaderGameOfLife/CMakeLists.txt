cmake_minimum_required(VERSION 3.13)

add_executable(TestShaderGameOfLife)

Siv3DAppSetProjectDefaultConfig(TestShaderGameOfLife)

target_sources(TestShaderGameOfLife
    PRIVATE
        Main.cpp
)

set(TestShaderGameOfLifeBundledFilesPath
    /example/shader/
)

Siv3DAppProjectDataBundle(TestShaderGameOfLife "${TestShaderGameOfLifeBundledFilesPath}")
