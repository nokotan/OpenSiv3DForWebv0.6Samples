cmake_minimum_required(VERSION 3.13)

add_executable(TestShaderPoissonDisk)

Siv3DAppSetProjectDefaultConfig(TestShaderPoissonDisk)

target_sources(TestShaderPoissonDisk
    PRIVATE
        Main.cpp
)

set(TestShaderPoissonDiskBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
    /example/shader/
    /example/windmill.png
)

Siv3DAppProjectDataBundle(TestShaderPoissonDisk "${TestShaderPoissonDiskBundledFilesPath}")
