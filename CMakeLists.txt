cmake_minimum_required(VERSION 3.13)

project(Siv3DTest)



# Common Config

set(Siv3DTestIncludeDirectories
    ${CMAKE_CURRENT_SOURCE_DIR}/Siv3D/include
    ${CMAKE_CURRENT_SOURCE_DIR}/Siv3D/include/ThirdParty
)

set(Siv3DTestLibraryDirectories
    ${CMAKE_CURRENT_SOURCE_DIR}/Siv3D/lib
    ${CMAKE_CURRENT_SOURCE_DIR}/Siv3D/lib/freetype
    ${CMAKE_CURRENT_SOURCE_DIR}/Siv3D/lib/harfbuzz
    ${CMAKE_CURRENT_SOURCE_DIR}/Siv3D/lib/opencv
    ${CMAKE_CURRENT_SOURCE_DIR}/Siv3D/lib/turbojpeg
    ${CMAKE_CURRENT_SOURCE_DIR}/Siv3D/lib/giflib
    ${CMAKE_CURRENT_SOURCE_DIR}/Siv3D/lib/webp
    ${CMAKE_CURRENT_SOURCE_DIR}/Siv3D/lib/opus
    ${CMAKE_CURRENT_SOURCE_DIR}/Siv3D/lib/tiff
)

set(Siv3DTestLibraries
    Siv3D
    freetype
    harfbuzz
    turbojpeg
    opencv_core
    opencv_imgproc
    opencv_objdetect
    opencv_photo
    gif
    webp
    opusfile 
    opus
    tiff
)

set(Siv3DTestCompileFlags 
    "-Wno-unknown-pragmas"
    "-D_XM_SSE4_INTRINSICS_" 
)

set(Siv3DTestLinkerFlags
    # "--closure 1"

    # "-s ENVIRONMENT='WEB'"
    "-s ALLOW_MEMORY_GROWTH=1"
    "-s ERROR_ON_UNDEFINED_SYMBOLS=0"

    "-s USE_SDL=2"
    "-s USE_LIBPNG=1"
    "-s USE_OGG=1"
    "-s USE_VORBIS=1"

    "-s FULL_ES3=1"
    "-s USE_GLFW=3"
    "-s MIN_WEBGL_VERSION=2"
    "-s MAX_WEBGL_VERSION=2"

    # "--shell-file '${CMAKE_CURRENT_SOURCE_DIR}/Templates/Embeddable/web-player.html'"
    # "--post-js '${CMAKE_CURRENT_SOURCE_DIR}/Templates/Embeddable/web-player.js'"
    "--js-library '${CMAKE_CURRENT_SOURCE_DIR}/Siv3D/lib/Siv3D.js'"

    "--pre-js '${CMAKE_BINARY_DIR}/Siv3DTest.data.js'"
    "-s FORCE_FILESYSTEM=1"
)

string (REPLACE ";" " " Siv3DTestCompileFlags "${Siv3DTestCompileFlags}")
string (REPLACE ";" " " Siv3DTestLinkerFlags "${Siv3DTestLinkerFlags}")



# Packaging Files

add_custom_command(
    OUTPUT Siv3DTest.data Siv3DTest.data.js
    COMMAND python3 
    ARGS
        $ENV{EMSDK}/upstream/emscripten/tools/file_packager.py
        Siv3DTest.data
        --js-output=Siv3DTest.data.js
        --preload "${CMAKE_CURRENT_SOURCE_DIR}/Siv3D/resources@/resources"
        --preload "${CMAKE_CURRENT_SOURCE_DIR}/Siv3D/example@/example"
        --from-emcc
)

add_custom_target(
    Siv3DTestData
    DEPENDS Siv3DTest.data Siv3DTest.data.js
)



# Projects

add_subdirectory(Main)
