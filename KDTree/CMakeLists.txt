cmake_minimum_required(VERSION 3.13)

add_executable(KDTree)

Siv3DAppSetProjectDefaultConfig(KDTree)

target_sources(KDTree
    PRIVATE
        Main.cpp
)
