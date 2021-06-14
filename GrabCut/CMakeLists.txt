cmake_minimum_required(VERSION 3.13)

add_executable(GrabCut)

Siv3DAppSetProjectDefaultConfig(GrabCut)

target_sources(GrabCut
    PRIVATE
        Main.cpp
)

set_target_properties(VideoReader
    PROPERTIES LINK_FLAGS 
        "${Siv3DAppLinkerFlags} --preload-file ${CMAKE_SOURCE_DIR}/Siv3D/example/windmill.png@/example/windmill.png"
)
