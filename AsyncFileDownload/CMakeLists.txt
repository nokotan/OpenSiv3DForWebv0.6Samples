cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(AsyncFileDownload)

set(AsyncFileDownloadBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
)

Siv3DAppProjectDataBundle(AsyncFileDownload "${AsyncFileDownloadBundledFilesPath}")
