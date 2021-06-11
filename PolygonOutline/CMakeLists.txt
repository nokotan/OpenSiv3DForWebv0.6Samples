cmake_minimum_required(VERSION 3.13)

add_executable(PolygonOutline)

Siv3DAppSetProjectDefaultConfig(PolygonOutline)

target_sources(PolygonOutline
    PRIVATE
        Main.cpp
)
