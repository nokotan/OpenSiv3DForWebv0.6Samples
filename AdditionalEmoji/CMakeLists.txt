cmake_minimum_required(VERSION 3.13)

add_executable(AdditionalEmoji)

Siv3DAppSetProjectDefaultConfig(AdditionalEmoji)

target_sources(AdditionalEmoji
    PRIVATE
        Main.cpp
)

set(AdditionalEmojiBundledFilesPath
    /example/windmill.png
)

Siv3DAppProjectDataBundle(AdditionalEmoji "${AdditionalEmojiBundledFilesPath}")
