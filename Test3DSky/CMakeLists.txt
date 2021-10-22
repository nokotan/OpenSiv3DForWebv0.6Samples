cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(Test3DSky)

set(Test3DSkyBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
    /example/texture/ground.jpg
    /example/obj
)

Siv3DAppProjectDataBundle(Test3DSky "${Test3DSkyBundledFilesPath}")
