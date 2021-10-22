cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(MaterialIcon)

set(MaterialIconBundledFilesPath
    /resources/engine/font/materialdesignicons/materialdesignicons-webfont.ttf.zstdcmp
    /resources/engine/font/mplus/mplus-1p-medium.ttf.zstdcmp
)

Siv3DAppProjectDataBundle(MaterialIcon "${MaterialIconBundledFilesPath}")
