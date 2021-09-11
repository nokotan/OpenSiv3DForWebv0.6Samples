cmake_minimum_required(VERSION 3.13)

add_executable(MaterialIcon)

Siv3DAppSetProjectDefaultConfig(MaterialIcon)

target_sources(MaterialIcon
    PRIVATE
        Main.cpp
)

set(MaterialIconBundledFilesPath
    /resources/engine/font/
)

Siv3DAppProjectDataBundle(MaterialIcon "${MaterialIconBundledFilesPath}")
