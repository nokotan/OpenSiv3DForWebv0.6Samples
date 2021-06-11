cmake_minimum_required(VERSION 3.13)

add_executable(Main)

target_include_directories(Main
    PUBLIC
        "${Siv3DTestIncludeDirectories}"
)

target_link_directories(Main
    PUBLIC
        "${Siv3DTestLibraryDirectories}"
)

target_link_libraries(Main
    "${Siv3DTestLibraries}"
)

target_sources(Main
    PRIVATE
        Main.cpp
)

set_target_properties(Main
    PROPERTIES COMPILE_FLAGS 
        "${Siv3DTestCompileFlags}"
)

set_target_properties(Main
    PROPERTIES LINK_FLAGS 
        "${Siv3DTestLinkerFlags}"
)

set_target_properties(Main
    PROPERTIES 
        CXX_STANDARD 20
        SUFFIX ".html"
)

add_custom_command(
    TARGET Main
    PRE_LINK
    COMMAND cp ${CMAKE_BINARY_DIR}/Siv3DTest.data ${CMAKE_BINARY_DIR}/Main
)

add_dependencies(Main
    Siv3DTestData
)
