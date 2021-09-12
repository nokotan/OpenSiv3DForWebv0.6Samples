# Install script for directory: /__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "/usr/local")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "MINSIZEREL")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Is this installation the result of a crosscompile?
if(NOT DEFINED CMAKE_CROSSCOMPILING)
  set(CMAKE_CROSSCOMPILING "TRUE")
endif()

if(NOT CMAKE_INSTALL_LOCAL_ONLY)
  # Include the install script for each subdirectory.
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/Main/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/AsyncFileDownload/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/DragDrop/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/Microphone/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/MaterialIcon/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/QRReader/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/Terrain/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/VideoReader/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/WebCam/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/AdditionalEmoji/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/EmpoweredAudio/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/KDTree/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/GeoJson/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/GrabCut/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/Spline2D/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/P2WheelJoint/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/PackRectangles/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/PolygonOutline/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/PerlinNoise/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/QRCode/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/RayIntersection/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/NavMesh/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/SoftShape/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/ViewFrustum/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/Test3DCase1/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/Test3DCase2/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/Test3DCase3/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/Test3DCase4/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/Test3DShading/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/Test3DSky/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/TestSRGBCase1/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/TestSRGBCase2/cmake_install.cmake")
  include("/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/TestSRGBCase3/cmake_install.cmake")

endif()

if(CMAKE_INSTALL_COMPONENT)
  set(CMAKE_INSTALL_MANIFEST "install_manifest_${CMAKE_INSTALL_COMPONENT}.txt")
else()
  set(CMAKE_INSTALL_MANIFEST "install_manifest.txt")
endif()

string(REPLACE ";" "\n" CMAKE_INSTALL_MANIFEST_CONTENT
       "${CMAKE_INSTALL_MANIFEST_FILES}")
file(WRITE "/__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/${CMAKE_INSTALL_MANIFEST}"
     "${CMAKE_INSTALL_MANIFEST_CONTENT}")
