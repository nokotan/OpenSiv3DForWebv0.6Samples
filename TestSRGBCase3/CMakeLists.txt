cmake_minimum_required(VERSION 3.13)

add_executable(TestSRGBCase3)

Siv3DAppSetProjectDefaultConfig(TestSRGBCase3)

target_sources(TestSRGBCase3
    PRIVATE
        Main.cpp
)

set(TestSRGBCase3BundledFilesPath
    /example/windmill.png
    /example/texture/earth.jpg
)

Siv3DAppProjectDataBundle(TestSRGBCase3 "${TestSRGBCase3BundledFilesPath}")
