cmake_minimum_required(VERSION 3.13)

add_executable(NavMesh)

Siv3DAppSetProjectDefaultConfig(NavMesh)

target_sources(NavMesh
    PRIVATE
        Main.cpp
)
