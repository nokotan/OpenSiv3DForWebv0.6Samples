cmake_minimum_required(VERSION 3.13)

project(Siv3DApp)



# Common Config

set(Siv3DAppIncludeDirectories
    ${CMAKE_CURRENT_SOURCE_DIR}/Siv3D/include
    ${CMAKE_CURRENT_SOURCE_DIR}/Siv3D/include/ThirdParty
)

set(Siv3DAppLibraryDirectories
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

set(Siv3DAppLibraries
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

set(Siv3DAppCompileFlags 
    "-Wno-unknown-pragmas"
)

set(Siv3DAppLinkerFlags
    "--closure 1"

    "-s ENVIRONMENT='web'"
    "-s MODULARIZE=1"
    "-s ALLOW_MEMORY_GROWTH=1"
    "-s ERROR_ON_UNDEFINED_SYMBOLS=0"
    # "-s DECLARE_ASM_MODULE_EXPORTS=0"

    "-s USE_SDL=2"
    "-s USE_LIBPNG=1"
    "-s USE_OGG=1"
    "-s USE_VORBIS=1"

    "-s FULL_ES3=1"
    "-s USE_GLFW=3"
    "-s MIN_WEBGL_VERSION=2"
    "-s MAX_WEBGL_VERSION=2"

    "-s ASYNCIFY=1"
    "-s ASYNCIFY_IGNORE_INDIRECT=1"
    "-s ASYNCIFY_IMPORTS=\"[ 'siv3dRequestAnimationFrame', 'siv3dOpenDialog', 'siv3dDecodeAudioFromFile', 'siv3dGetClipboardText' ]\""
    "-s ASYNCIFY_ADD=\"[ 'main', 'Main()', 's3d::System::Update()', 's3d::AACDecoder::decode(*) const', 's3d::MP3Decoder::decode(*) const', 's3d::CAudioDecoder::decode(*)', 's3d::AudioDecoder::Decode(*)', 's3d::Wave::Wave(*)', 's3d::Audio::Audio(*)', 's3d::Clipboard::GetText(*)', 's3d::CClipboard::getText(*)' ]\""

    "-s LZ4=1"

    "--shell-file '${CMAKE_CURRENT_SOURCE_DIR}/Templates/Embeddable/web-player.html'"
    "--post-js '${CMAKE_CURRENT_SOURCE_DIR}/Templates/Embeddable/web-player.js'"
    "--js-library '${CMAKE_CURRENT_SOURCE_DIR}/Siv3D/lib/Siv3D.js'"
    "--pre-js '${CMAKE_CURRENT_SOURCE_DIR}/Siv3D/lib/Siv3D.pre.js'"
)

string (REPLACE ";" " " Siv3DAppCompileFlags "${Siv3DAppCompileFlags}")
string (REPLACE ";" " " Siv3DAppLinkerFlags "${Siv3DAppLinkerFlags}")

if (NOT CMAKE_BUILD_TYPE STREQUAL "MINSIZEREL")
  set(Siv3DAppCompileFlags "${Siv3DAppCompileFlags} -s EXCEPTION_CATCHING_ALLOWED=[\"InitSiv3D\"]")
  set(Siv3DAppLinkerFlags "${Siv3DAppLinkerFlags} -s EXCEPTION_CATCHING_ALLOWED=[\"InitSiv3D\"]")
endif()

if ("${CMAKE_C_FLAGS}" STREQUAL "" OR NOT ${CMAKE_C_FLAGS} MATCHES "-msimd128")
  set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -D_XM_NO_INTRINSICS_")
endif ()

if ("${CMAKE_CXX_FLAGS}" STREQUAL "" OR NOT ${CMAKE_CXX_FLAGS} MATCHES "-msimd128")
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -D_XM_NO_INTRINSICS_")
endif ()



# Packaging Files

set(Siv3DAppBundledFilesPath
    /resources/engine/font/noto-cjk/LICENSE
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
    /resources/engine/font/noto-emoji
    /resources/engine/shader/glsl
    /resources/engine/texture/box-shadow
)

set(Siv3DAppBundledFilesFlags "")

foreach(file ${Siv3DAppBundledFilesPath})
    list(APPEND Siv3DAppBundledFilesFlags "--preload")
    list(APPEND Siv3DAppBundledFilesFlags "${CMAKE_CURRENT_SOURCE_DIR}/Siv3D/${file}@${file}")
endforeach()

add_custom_command(
    OUTPUT Siv3DApp.data Siv3DApp.data.js
    COMMAND python3 
    ARGS
        $ENV{EMSDK}/upstream/emscripten/tools/file_packager.py
        Siv3DApp.data
        --js-output=Siv3DApp.data.js
        ${Siv3DAppBundledFilesFlags}
        --lz4
        --from-emcc
)

add_custom_target(
    Siv3DAppData
    DEPENDS Siv3DApp.data Siv3DApp.data.js
)



# Projects

function(Siv3DAppSetProjectDefaultConfig ProjectName)

    target_include_directories(${ProjectName}
        PUBLIC
            "${Siv3DAppIncludeDirectories}"
    )

    target_link_directories(${ProjectName}
        PUBLIC
            "${Siv3DAppLibraryDirectories}"
    )

    target_link_libraries(${ProjectName}
        "${Siv3DAppLibraries}"
    )

    set_target_properties(${ProjectName}
        PROPERTIES COMPILE_FLAGS 
            "${Siv3DAppCompileFlags}"
    )

    set_target_properties(${ProjectName}
        PROPERTIES LINK_FLAGS 
            "${Siv3DAppLinkerFlags}"
    )

    set_target_properties(${ProjectName}
        PROPERTIES 
            CXX_STANDARD 20
            SUFFIX ".html"
            LINK_DEPENDS "Siv3DApp.data.js"
    )

    add_custom_command(
        TARGET ${ProjectName}
        PRE_LINK
        COMMAND cp ${CMAKE_BINARY_DIR}/Siv3DApp.data ${CMAKE_BINARY_DIR}/${ProjectName}
    )

    add_dependencies(${ProjectName}
        Siv3DAppData
    )

    get_target_property(ProjectLinkFlag
        ${ProjectName} LINK_FLAGS
    )

    set_target_properties(${ProjectName}
        PROPERTIES LINK_FLAGS 
            "${ProjectLinkFlag} --pre-js '${CMAKE_BINARY_DIR}/Siv3DApp.data.js' -s FORCE_FILESYSTEM=1"
    )

endfunction()

function(Siv3DAppProjectDataBundle ProjectName FilesPath)

    set(BundledFilesFlags "")

    foreach(file ${FilesPath})
        list(APPEND BundledFilesFlags "--preload-file")
        list(APPEND BundledFilesFlags "${CMAKE_SOURCE_DIR}/Siv3D/${file}@${file}")
    endforeach()

    string (REPLACE ";" " " BundledFilesFlags "${BundledFilesFlags}")

    get_target_property(ProjectLinkFlag
        ${ProjectName} LINK_FLAGS
    )

    set_target_properties(${ProjectName}
        PROPERTIES LINK_FLAGS 
            "${ProjectLinkFlag} ${BundledFilesFlags}"
    )
    
endfunction()


add_subdirectory(Main)

# add_subdirectory(Main3D)
add_subdirectory(AsyncFileDownload)
add_subdirectory(DragDrop)
add_subdirectory(Microphone)
add_subdirectory(MaterialIcon)
add_subdirectory(QRReader)
add_subdirectory(Terrain)
add_subdirectory(VideoReader)
add_subdirectory(WebCam)

add_subdirectory(AdditionalEmoji)
add_subdirectory(EmpoweredAudio)
add_subdirectory(KDTree)
add_subdirectory(GeoJson)
add_subdirectory(GrabCut)
add_subdirectory(Spline2D)
add_subdirectory(P2WheelJoint)
add_subdirectory(PackRectangles)
add_subdirectory(PolygonOutline)
add_subdirectory(PerlinNoise)
add_subdirectory(QRCode)
add_subdirectory(RayIntersection)
add_subdirectory(NavMesh)
add_subdirectory(SoftShape)
add_subdirectory(ViewFrustum)
add_subdirectory(TCPonWebSocket)

add_subdirectory(TestShaderDefault2D)
add_subdirectory(TestShaderDefault3D)
add_subdirectory(TestShaderBlockGame)
add_subdirectory(TestShaderExtractBright)
add_subdirectory(TestShaderForwardFog)
add_subdirectory(TestShaderForwardTriplanar)
add_subdirectory(TestShaderGameOfLife)
add_subdirectory(TestShaderGrayScale)
add_subdirectory(TestShaderMultiTextureBlend)
add_subdirectory(TestShaderMultiShaderMask)
add_subdirectory(TestShaderPoissonDisk)
add_subdirectory(TestShaderPosterize)
add_subdirectory(TestShaderRGBShift)
add_subdirectory(TestShaderRGBToBGR)
add_subdirectory(TestShaderSwirl)
add_subdirectory(TestShaderTerrainNormal)

add_subdirectory(Test3DCase1)
add_subdirectory(Test3DCase2)
add_subdirectory(Test3DCase3)
add_subdirectory(Test3DCase4)
add_subdirectory(Test3DShading)
add_subdirectory(Test3DSky)
add_subdirectory(TestSRGBCase1)
add_subdirectory(TestSRGBCase2)
add_subdirectory(TestSRGBCase3)
