cmake_minimum_required(VERSION 3.13)

add_executable(Test3DCase1)

Siv3DAppSetProjectDefaultConfig(Test3DCase1)

target_sources(Test3DCase1
    PRIVATE
        Main.cpp
)

set(Test3DCase1BundledFilesPath
    /example/texture/ground.jpg
    /example/obj
)

Siv3DAppProjectDataBundle(Test3DCase1 "${Test3DCase1BundledFilesPath}")
