cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(TestShaderForwardTriplanar)

set(TestShaderForwardTriplanarBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
    /example/shader/
    /example/texture/uv.png
    /example/texture/wood.jpg
)

Siv3DAppProjectDataBundle(TestShaderForwardTriplanar "${TestShaderForwardTriplanarBundledFilesPath}")
