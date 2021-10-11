cmake_minimum_required(VERSION 3.13)

add_executable(TestShaderForwardTriplanar)

Siv3DAppSetProjectDefaultConfig(TestShaderForwardTriplanar)

target_sources(TestShaderForwardTriplanar
    PRIVATE
        Main.cpp
)

set(TestShaderForwardTriplanarBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
    /example/shader/
    /example/texture/uv.png
    /example/texture/wood.jpg
)

Siv3DAppProjectDataBundle(TestShaderForwardTriplanar "${TestShaderForwardTriplanarBundledFilesPath}")
