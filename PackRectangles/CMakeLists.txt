cmake_minimum_required(VERSION 3.13)

add_executable(PackRectangles)

Siv3DAppSetProjectDefaultConfig(PackRectangles)

target_sources(PackRectangles
    PRIVATE
        Main.cpp
)
