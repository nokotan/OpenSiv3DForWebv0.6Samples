cmake_minimum_required(VERSION 3.13)

add_executable(Test3DSky)

Siv3DAppSetProjectDefaultConfig(Test3DSky)

target_sources(Test3DSky
    PRIVATE
        Main.cpp
)

set(Test3DSkyBundledFilesPath
    /example/texture/ground.jpg
    /example/obj
)

Siv3DAppProjectDataBundle(Test3DSky "${Test3DSkyBundledFilesPath}")
