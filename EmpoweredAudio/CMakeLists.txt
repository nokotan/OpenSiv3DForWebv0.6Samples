cmake_minimum_required(VERSION 3.13)

add_executable(EmpoweredAudio)

Siv3DAppSetProjectDefaultConfig(EmpoweredAudio)

target_sources(EmpoweredAudio
    PRIVATE
        Main.cpp
)
