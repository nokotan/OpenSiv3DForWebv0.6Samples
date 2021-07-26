cmake_minimum_required(VERSION 3.13)

add_executable(TestSRGBCase1)

Siv3DAppSetProjectDefaultConfig(TestSRGBCase1)

target_sources(TestSRGBCase1
    PRIVATE
        Main.cpp
)
