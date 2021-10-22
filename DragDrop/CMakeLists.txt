cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(DragDrop)

set(DragDropBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
)

Siv3DAppProjectDataBundle(DragDrop "${DragDropBundledFilesPath}")
