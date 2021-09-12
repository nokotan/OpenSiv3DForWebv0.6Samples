cmake_minimum_required(VERSION 3.13)

add_executable(TestShaderExtractBright)

Siv3DAppSetProjectDefaultConfig(TestShaderExtractBright)

target_sources(TestShaderExtractBright
    PRIVATE
        Main.cpp
)

set(TestShaderExtractBrightBundledFilesPath
    /example/shader/
)

Siv3DAppProjectDataBundle(TestShaderExtractBright "${TestShaderExtractBrightBundledFilesPath}")
