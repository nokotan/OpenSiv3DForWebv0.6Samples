cmake_minimum_required(VERSION 3.13)

add_executable(DragDrop)

Siv3DAppSetProjectDefaultConfig(DragDrop)

target_sources(DragDrop
    PRIVATE
        Main.cpp
)
