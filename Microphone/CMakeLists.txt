cmake_minimum_required(VERSION 3.13)

add_executable(Microphone)

Siv3DAppSetProjectDefaultConfig(Microphone)

target_sources(Microphone
    PRIVATE
        Main.cpp
)
