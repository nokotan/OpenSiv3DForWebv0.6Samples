cmake_minimum_required(VERSION 3.13)

add_executable(TestShaderPosterize)

Siv3DAppSetProjectDefaultConfig(TestShaderPosterize)

target_sources(TestShaderPosterize
    PRIVATE
        Main.cpp
)

set(TestShaderPosterizeBundledFilesPath
    /example/shader/
    /example/windmill.png
)

Siv3DAppProjectDataBundle(TestShaderPosterize "${TestShaderPosterizeBundledFilesPath}")
