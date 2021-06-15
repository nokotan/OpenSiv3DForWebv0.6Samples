cmake_minimum_required(VERSION 3.13)

add_executable(GrabCut)

Siv3DAppSetProjectDefaultConfig(GrabCut)

target_sources(GrabCut
    PRIVATE
        Main.cpp
)

set(GrabCutBundledFilesPath
    /example/windmill.png
)

Siv3DAppProjectDataBundle(GrabCut "${GrabCutBundledFilesPath}")
