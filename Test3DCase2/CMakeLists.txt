cmake_minimum_required(VERSION 3.13)

add_executable(Test3DCase2)

Siv3DAppSetProjectDefaultConfig(Test3DCase2)

target_sources(Test3DCase2
    PRIVATE
        Main.cpp
)

set(Test3DCase2BundledFilesPath
    /example/texture/ground.jpg
    /example/obj
)

Siv3DAppProjectDataBundle(Test3DCase2 "${Test3DCase2BundledFilesPath}")
