cmake_minimum_required(VERSION 3.13)

add_executable(TestShaderSwirl)

Siv3DAppSetProjectDefaultConfig(TestShaderSwirl)

target_sources(TestShaderSwirl
    PRIVATE
        Main.cpp
)

set(TestShaderSwirlBundledFilesPath
    /example/shader/
    /example/windmill.png
)

Siv3DAppProjectDataBundle(TestShaderSwirl "${TestShaderSwirlBundledFilesPath}")
