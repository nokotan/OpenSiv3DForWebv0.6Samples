cmake_minimum_required(VERSION 3.13)

add_executable(AsyncFileDownload)

Siv3DAppSetProjectDefaultConfig(AsyncFileDownload)

target_sources(AsyncFileDownload
    PRIVATE
        Main.cpp
)
