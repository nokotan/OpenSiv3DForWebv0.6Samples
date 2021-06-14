cmake_minimum_required(VERSION 3.13)

add_executable(VideoReader)

Siv3DAppSetProjectDefaultConfig(VideoReader)

target_sources(VideoReader
    PRIVATE
        Main.cpp
)

set_target_properties(VideoReader
    PROPERTIES LINK_FLAGS 
        "${Siv3DAppLinkerFlags} --preload-file ${CMAKE_SOURCE_DIR}/Siv3D/example/video/river.mp4@/example/video/river.mp4"
)
