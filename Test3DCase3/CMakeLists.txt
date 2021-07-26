cmake_minimum_required(VERSION 3.13)

add_executable(Test3DCase3)

Siv3DAppSetProjectDefaultConfig(Test3DCase3)

target_sources(Test3DCase3
    PRIVATE
        Main.cpp
)

set(Test3DCase3BundledFilesPath
    /example/windmill.png
    /example/texture/earth.jpg
)

Siv3DAppProjectDataBundle(Test3DCase3 "${Test3DCase3BundledFilesPath}")
