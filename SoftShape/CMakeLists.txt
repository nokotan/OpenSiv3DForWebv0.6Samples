cmake_minimum_required(VERSION 3.13)

add_executable(SoftShape)

Siv3DAppSetProjectDefaultConfig(SoftShape)

target_sources(SoftShape
    PRIVATE
        Main.cpp
)

set(SoftShapeBundledFilesPath
    /example/shader/
)

Siv3DAppProjectDataBundle(SoftShape "${SoftShapeBundledFilesPath}")
