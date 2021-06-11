cmake_minimum_required(VERSION 3.13)

add_executable(P2WheelJoint)

Siv3DAppSetProjectDefaultConfig(P2WheelJoint)

target_sources(P2WheelJoint
    PRIVATE
        Main.cpp
)
