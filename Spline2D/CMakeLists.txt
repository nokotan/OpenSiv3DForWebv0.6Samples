cmake_minimum_required(VERSION 3.13)

add_executable(Spline2D)

Siv3DAppSetProjectDefaultConfig(Spline2D)

target_sources(Spline2D
    PRIVATE
        Main.cpp
)
