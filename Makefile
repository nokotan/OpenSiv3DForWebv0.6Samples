# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.16

# Default target executed when no arguments are given to make.
default_target: all

.PHONY : default_target

# Allow only one "make -f Makefile2" at a time, but pass parallelism.
.NOTPARALLEL:


#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:


# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =

.SUFFIXES: .hpux_make_needs_suffix_list


# Suppress display of executed commands.
$(VERBOSE).SILENT:


# A target that is always out of date.
cmake_force:

.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E remove -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build

#=============================================================================
# Targets provided globally by CMake.

# Special rule for the target rebuild_cache
rebuild_cache:
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --cyan "Running CMake to regenerate build system..."
	/usr/bin/cmake -S$(CMAKE_SOURCE_DIR) -B$(CMAKE_BINARY_DIR)
.PHONY : rebuild_cache

# Special rule for the target rebuild_cache
rebuild_cache/fast: rebuild_cache

.PHONY : rebuild_cache/fast

# Special rule for the target edit_cache
edit_cache:
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --cyan "No interactive CMake dialog available..."
	/usr/bin/cmake -E echo No\ interactive\ CMake\ dialog\ available.
.PHONY : edit_cache

# Special rule for the target edit_cache
edit_cache/fast: edit_cache

.PHONY : edit_cache/fast

# The main all target
all: cmake_check_build_system
	$(CMAKE_COMMAND) -E cmake_progress_start /__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/CMakeFiles /__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/CMakeFiles/progress.marks
	$(MAKE) -f CMakeFiles/Makefile2 all
	$(CMAKE_COMMAND) -E cmake_progress_start /__w/OpenSiv3DForWebv0.6Samples/OpenSiv3DForWebv0.6Samples/Build/CMakeFiles 0
.PHONY : all

# The main clean target
clean:
	$(MAKE) -f CMakeFiles/Makefile2 clean
.PHONY : clean

# The main clean target
clean/fast: clean

.PHONY : clean/fast

# Prepare targets for installation.
preinstall: all
	$(MAKE) -f CMakeFiles/Makefile2 preinstall
.PHONY : preinstall

# Prepare targets for installation.
preinstall/fast:
	$(MAKE) -f CMakeFiles/Makefile2 preinstall
.PHONY : preinstall/fast

# clear depends
depend:
	$(CMAKE_COMMAND) -S$(CMAKE_SOURCE_DIR) -B$(CMAKE_BINARY_DIR) --check-build-system CMakeFiles/Makefile.cmake 1
.PHONY : depend

#=============================================================================
# Target rules for targets named Siv3DAppData

# Build rule for target.
Siv3DAppData: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 Siv3DAppData
.PHONY : Siv3DAppData

# fast build rule for target.
Siv3DAppData/fast:
	$(MAKE) -f CMakeFiles/Siv3DAppData.dir/build.make CMakeFiles/Siv3DAppData.dir/build
.PHONY : Siv3DAppData/fast

#=============================================================================
# Target rules for targets named Main

# Build rule for target.
Main: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 Main
.PHONY : Main

# fast build rule for target.
Main/fast:
	$(MAKE) -f Main/CMakeFiles/Main.dir/build.make Main/CMakeFiles/Main.dir/build
.PHONY : Main/fast

#=============================================================================
# Target rules for targets named AsyncFileDownload

# Build rule for target.
AsyncFileDownload: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 AsyncFileDownload
.PHONY : AsyncFileDownload

# fast build rule for target.
AsyncFileDownload/fast:
	$(MAKE) -f AsyncFileDownload/CMakeFiles/AsyncFileDownload.dir/build.make AsyncFileDownload/CMakeFiles/AsyncFileDownload.dir/build
.PHONY : AsyncFileDownload/fast

#=============================================================================
# Target rules for targets named DragDrop

# Build rule for target.
DragDrop: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 DragDrop
.PHONY : DragDrop

# fast build rule for target.
DragDrop/fast:
	$(MAKE) -f DragDrop/CMakeFiles/DragDrop.dir/build.make DragDrop/CMakeFiles/DragDrop.dir/build
.PHONY : DragDrop/fast

#=============================================================================
# Target rules for targets named Microphone

# Build rule for target.
Microphone: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 Microphone
.PHONY : Microphone

# fast build rule for target.
Microphone/fast:
	$(MAKE) -f Microphone/CMakeFiles/Microphone.dir/build.make Microphone/CMakeFiles/Microphone.dir/build
.PHONY : Microphone/fast

#=============================================================================
# Target rules for targets named MaterialIcon

# Build rule for target.
MaterialIcon: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 MaterialIcon
.PHONY : MaterialIcon

# fast build rule for target.
MaterialIcon/fast:
	$(MAKE) -f MaterialIcon/CMakeFiles/MaterialIcon.dir/build.make MaterialIcon/CMakeFiles/MaterialIcon.dir/build
.PHONY : MaterialIcon/fast

#=============================================================================
# Target rules for targets named QRReader

# Build rule for target.
QRReader: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 QRReader
.PHONY : QRReader

# fast build rule for target.
QRReader/fast:
	$(MAKE) -f QRReader/CMakeFiles/QRReader.dir/build.make QRReader/CMakeFiles/QRReader.dir/build
.PHONY : QRReader/fast

#=============================================================================
# Target rules for targets named Terrain

# Build rule for target.
Terrain: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 Terrain
.PHONY : Terrain

# fast build rule for target.
Terrain/fast:
	$(MAKE) -f Terrain/CMakeFiles/Terrain.dir/build.make Terrain/CMakeFiles/Terrain.dir/build
.PHONY : Terrain/fast

#=============================================================================
# Target rules for targets named VideoReader

# Build rule for target.
VideoReader: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 VideoReader
.PHONY : VideoReader

# fast build rule for target.
VideoReader/fast:
	$(MAKE) -f VideoReader/CMakeFiles/VideoReader.dir/build.make VideoReader/CMakeFiles/VideoReader.dir/build
.PHONY : VideoReader/fast

#=============================================================================
# Target rules for targets named WebCam

# Build rule for target.
WebCam: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 WebCam
.PHONY : WebCam

# fast build rule for target.
WebCam/fast:
	$(MAKE) -f WebCam/CMakeFiles/WebCam.dir/build.make WebCam/CMakeFiles/WebCam.dir/build
.PHONY : WebCam/fast

#=============================================================================
# Target rules for targets named AdditionalEmoji

# Build rule for target.
AdditionalEmoji: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 AdditionalEmoji
.PHONY : AdditionalEmoji

# fast build rule for target.
AdditionalEmoji/fast:
	$(MAKE) -f AdditionalEmoji/CMakeFiles/AdditionalEmoji.dir/build.make AdditionalEmoji/CMakeFiles/AdditionalEmoji.dir/build
.PHONY : AdditionalEmoji/fast

#=============================================================================
# Target rules for targets named EmpoweredAudio

# Build rule for target.
EmpoweredAudio: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 EmpoweredAudio
.PHONY : EmpoweredAudio

# fast build rule for target.
EmpoweredAudio/fast:
	$(MAKE) -f EmpoweredAudio/CMakeFiles/EmpoweredAudio.dir/build.make EmpoweredAudio/CMakeFiles/EmpoweredAudio.dir/build
.PHONY : EmpoweredAudio/fast

#=============================================================================
# Target rules for targets named KDTree

# Build rule for target.
KDTree: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 KDTree
.PHONY : KDTree

# fast build rule for target.
KDTree/fast:
	$(MAKE) -f KDTree/CMakeFiles/KDTree.dir/build.make KDTree/CMakeFiles/KDTree.dir/build
.PHONY : KDTree/fast

#=============================================================================
# Target rules for targets named GeoJson

# Build rule for target.
GeoJson: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 GeoJson
.PHONY : GeoJson

# fast build rule for target.
GeoJson/fast:
	$(MAKE) -f GeoJson/CMakeFiles/GeoJson.dir/build.make GeoJson/CMakeFiles/GeoJson.dir/build
.PHONY : GeoJson/fast

#=============================================================================
# Target rules for targets named GrabCut

# Build rule for target.
GrabCut: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 GrabCut
.PHONY : GrabCut

# fast build rule for target.
GrabCut/fast:
	$(MAKE) -f GrabCut/CMakeFiles/GrabCut.dir/build.make GrabCut/CMakeFiles/GrabCut.dir/build
.PHONY : GrabCut/fast

#=============================================================================
# Target rules for targets named Spline2D

# Build rule for target.
Spline2D: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 Spline2D
.PHONY : Spline2D

# fast build rule for target.
Spline2D/fast:
	$(MAKE) -f Spline2D/CMakeFiles/Spline2D.dir/build.make Spline2D/CMakeFiles/Spline2D.dir/build
.PHONY : Spline2D/fast

#=============================================================================
# Target rules for targets named P2WheelJoint

# Build rule for target.
P2WheelJoint: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 P2WheelJoint
.PHONY : P2WheelJoint

# fast build rule for target.
P2WheelJoint/fast:
	$(MAKE) -f P2WheelJoint/CMakeFiles/P2WheelJoint.dir/build.make P2WheelJoint/CMakeFiles/P2WheelJoint.dir/build
.PHONY : P2WheelJoint/fast

#=============================================================================
# Target rules for targets named PackRectangles

# Build rule for target.
PackRectangles: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 PackRectangles
.PHONY : PackRectangles

# fast build rule for target.
PackRectangles/fast:
	$(MAKE) -f PackRectangles/CMakeFiles/PackRectangles.dir/build.make PackRectangles/CMakeFiles/PackRectangles.dir/build
.PHONY : PackRectangles/fast

#=============================================================================
# Target rules for targets named PolygonOutline

# Build rule for target.
PolygonOutline: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 PolygonOutline
.PHONY : PolygonOutline

# fast build rule for target.
PolygonOutline/fast:
	$(MAKE) -f PolygonOutline/CMakeFiles/PolygonOutline.dir/build.make PolygonOutline/CMakeFiles/PolygonOutline.dir/build
.PHONY : PolygonOutline/fast

#=============================================================================
# Target rules for targets named PerlinNoise

# Build rule for target.
PerlinNoise: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 PerlinNoise
.PHONY : PerlinNoise

# fast build rule for target.
PerlinNoise/fast:
	$(MAKE) -f PerlinNoise/CMakeFiles/PerlinNoise.dir/build.make PerlinNoise/CMakeFiles/PerlinNoise.dir/build
.PHONY : PerlinNoise/fast

#=============================================================================
# Target rules for targets named QRCode

# Build rule for target.
QRCode: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 QRCode
.PHONY : QRCode

# fast build rule for target.
QRCode/fast:
	$(MAKE) -f QRCode/CMakeFiles/QRCode.dir/build.make QRCode/CMakeFiles/QRCode.dir/build
.PHONY : QRCode/fast

#=============================================================================
# Target rules for targets named RayIntersection

# Build rule for target.
RayIntersection: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 RayIntersection
.PHONY : RayIntersection

# fast build rule for target.
RayIntersection/fast:
	$(MAKE) -f RayIntersection/CMakeFiles/RayIntersection.dir/build.make RayIntersection/CMakeFiles/RayIntersection.dir/build
.PHONY : RayIntersection/fast

#=============================================================================
# Target rules for targets named NavMesh

# Build rule for target.
NavMesh: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 NavMesh
.PHONY : NavMesh

# fast build rule for target.
NavMesh/fast:
	$(MAKE) -f NavMesh/CMakeFiles/NavMesh.dir/build.make NavMesh/CMakeFiles/NavMesh.dir/build
.PHONY : NavMesh/fast

#=============================================================================
# Target rules for targets named SoftShape

# Build rule for target.
SoftShape: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 SoftShape
.PHONY : SoftShape

# fast build rule for target.
SoftShape/fast:
	$(MAKE) -f SoftShape/CMakeFiles/SoftShape.dir/build.make SoftShape/CMakeFiles/SoftShape.dir/build
.PHONY : SoftShape/fast

#=============================================================================
# Target rules for targets named ViewFrustum

# Build rule for target.
ViewFrustum: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 ViewFrustum
.PHONY : ViewFrustum

# fast build rule for target.
ViewFrustum/fast:
	$(MAKE) -f ViewFrustum/CMakeFiles/ViewFrustum.dir/build.make ViewFrustum/CMakeFiles/ViewFrustum.dir/build
.PHONY : ViewFrustum/fast

#=============================================================================
# Target rules for targets named TestShaderDefault2D

# Build rule for target.
TestShaderDefault2D: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 TestShaderDefault2D
.PHONY : TestShaderDefault2D

# fast build rule for target.
TestShaderDefault2D/fast:
	$(MAKE) -f TestShaderDefault2D/CMakeFiles/TestShaderDefault2D.dir/build.make TestShaderDefault2D/CMakeFiles/TestShaderDefault2D.dir/build
.PHONY : TestShaderDefault2D/fast

#=============================================================================
# Target rules for targets named TestShaderDefault3D

# Build rule for target.
TestShaderDefault3D: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 TestShaderDefault3D
.PHONY : TestShaderDefault3D

# fast build rule for target.
TestShaderDefault3D/fast:
	$(MAKE) -f TestShaderDefault3D/CMakeFiles/TestShaderDefault3D.dir/build.make TestShaderDefault3D/CMakeFiles/TestShaderDefault3D.dir/build
.PHONY : TestShaderDefault3D/fast

#=============================================================================
# Target rules for targets named TestShaderBlockGame

# Build rule for target.
TestShaderBlockGame: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 TestShaderBlockGame
.PHONY : TestShaderBlockGame

# fast build rule for target.
TestShaderBlockGame/fast:
	$(MAKE) -f TestShaderBlockGame/CMakeFiles/TestShaderBlockGame.dir/build.make TestShaderBlockGame/CMakeFiles/TestShaderBlockGame.dir/build
.PHONY : TestShaderBlockGame/fast

#=============================================================================
# Target rules for targets named TestShaderExtractBright

# Build rule for target.
TestShaderExtractBright: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 TestShaderExtractBright
.PHONY : TestShaderExtractBright

# fast build rule for target.
TestShaderExtractBright/fast:
	$(MAKE) -f TestShaderExtractBright/CMakeFiles/TestShaderExtractBright.dir/build.make TestShaderExtractBright/CMakeFiles/TestShaderExtractBright.dir/build
.PHONY : TestShaderExtractBright/fast

#=============================================================================
# Target rules for targets named TestShaderForwardFog

# Build rule for target.
TestShaderForwardFog: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 TestShaderForwardFog
.PHONY : TestShaderForwardFog

# fast build rule for target.
TestShaderForwardFog/fast:
	$(MAKE) -f TestShaderForwardFog/CMakeFiles/TestShaderForwardFog.dir/build.make TestShaderForwardFog/CMakeFiles/TestShaderForwardFog.dir/build
.PHONY : TestShaderForwardFog/fast

#=============================================================================
# Target rules for targets named TestShaderForwardTriplanar

# Build rule for target.
TestShaderForwardTriplanar: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 TestShaderForwardTriplanar
.PHONY : TestShaderForwardTriplanar

# fast build rule for target.
TestShaderForwardTriplanar/fast:
	$(MAKE) -f TestShaderForwardTriplanar/CMakeFiles/TestShaderForwardTriplanar.dir/build.make TestShaderForwardTriplanar/CMakeFiles/TestShaderForwardTriplanar.dir/build
.PHONY : TestShaderForwardTriplanar/fast

#=============================================================================
# Target rules for targets named TestShaderGameOfLife

# Build rule for target.
TestShaderGameOfLife: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 TestShaderGameOfLife
.PHONY : TestShaderGameOfLife

# fast build rule for target.
TestShaderGameOfLife/fast:
	$(MAKE) -f TestShaderGameOfLife/CMakeFiles/TestShaderGameOfLife.dir/build.make TestShaderGameOfLife/CMakeFiles/TestShaderGameOfLife.dir/build
.PHONY : TestShaderGameOfLife/fast

#=============================================================================
# Target rules for targets named TestShaderGrayScale

# Build rule for target.
TestShaderGrayScale: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 TestShaderGrayScale
.PHONY : TestShaderGrayScale

# fast build rule for target.
TestShaderGrayScale/fast:
	$(MAKE) -f TestShaderGrayScale/CMakeFiles/TestShaderGrayScale.dir/build.make TestShaderGrayScale/CMakeFiles/TestShaderGrayScale.dir/build
.PHONY : TestShaderGrayScale/fast

#=============================================================================
# Target rules for targets named TestShaderMultiTextureBlend

# Build rule for target.
TestShaderMultiTextureBlend: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 TestShaderMultiTextureBlend
.PHONY : TestShaderMultiTextureBlend

# fast build rule for target.
TestShaderMultiTextureBlend/fast:
	$(MAKE) -f TestShaderMultiTextureBlend/CMakeFiles/TestShaderMultiTextureBlend.dir/build.make TestShaderMultiTextureBlend/CMakeFiles/TestShaderMultiTextureBlend.dir/build
.PHONY : TestShaderMultiTextureBlend/fast

#=============================================================================
# Target rules for targets named TestShaderMultiShaderMask

# Build rule for target.
TestShaderMultiShaderMask: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 TestShaderMultiShaderMask
.PHONY : TestShaderMultiShaderMask

# fast build rule for target.
TestShaderMultiShaderMask/fast:
	$(MAKE) -f TestShaderMultiShaderMask/CMakeFiles/TestShaderMultiShaderMask.dir/build.make TestShaderMultiShaderMask/CMakeFiles/TestShaderMultiShaderMask.dir/build
.PHONY : TestShaderMultiShaderMask/fast

#=============================================================================
# Target rules for targets named TestShaderPoissonDisk

# Build rule for target.
TestShaderPoissonDisk: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 TestShaderPoissonDisk
.PHONY : TestShaderPoissonDisk

# fast build rule for target.
TestShaderPoissonDisk/fast:
	$(MAKE) -f TestShaderPoissonDisk/CMakeFiles/TestShaderPoissonDisk.dir/build.make TestShaderPoissonDisk/CMakeFiles/TestShaderPoissonDisk.dir/build
.PHONY : TestShaderPoissonDisk/fast

#=============================================================================
# Target rules for targets named TestShaderPosterize

# Build rule for target.
TestShaderPosterize: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 TestShaderPosterize
.PHONY : TestShaderPosterize

# fast build rule for target.
TestShaderPosterize/fast:
	$(MAKE) -f TestShaderPosterize/CMakeFiles/TestShaderPosterize.dir/build.make TestShaderPosterize/CMakeFiles/TestShaderPosterize.dir/build
.PHONY : TestShaderPosterize/fast

#=============================================================================
# Target rules for targets named TestShaderRGBShift

# Build rule for target.
TestShaderRGBShift: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 TestShaderRGBShift
.PHONY : TestShaderRGBShift

# fast build rule for target.
TestShaderRGBShift/fast:
	$(MAKE) -f TestShaderRGBShift/CMakeFiles/TestShaderRGBShift.dir/build.make TestShaderRGBShift/CMakeFiles/TestShaderRGBShift.dir/build
.PHONY : TestShaderRGBShift/fast

#=============================================================================
# Target rules for targets named TestShaderRGBToBGR

# Build rule for target.
TestShaderRGBToBGR: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 TestShaderRGBToBGR
.PHONY : TestShaderRGBToBGR

# fast build rule for target.
TestShaderRGBToBGR/fast:
	$(MAKE) -f TestShaderRGBToBGR/CMakeFiles/TestShaderRGBToBGR.dir/build.make TestShaderRGBToBGR/CMakeFiles/TestShaderRGBToBGR.dir/build
.PHONY : TestShaderRGBToBGR/fast

#=============================================================================
# Target rules for targets named TestShaderSwirl

# Build rule for target.
TestShaderSwirl: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 TestShaderSwirl
.PHONY : TestShaderSwirl

# fast build rule for target.
TestShaderSwirl/fast:
	$(MAKE) -f TestShaderSwirl/CMakeFiles/TestShaderSwirl.dir/build.make TestShaderSwirl/CMakeFiles/TestShaderSwirl.dir/build
.PHONY : TestShaderSwirl/fast

#=============================================================================
# Target rules for targets named TestShaderTerrainNormal

# Build rule for target.
TestShaderTerrainNormal: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 TestShaderTerrainNormal
.PHONY : TestShaderTerrainNormal

# fast build rule for target.
TestShaderTerrainNormal/fast:
	$(MAKE) -f TestShaderTerrainNormal/CMakeFiles/TestShaderTerrainNormal.dir/build.make TestShaderTerrainNormal/CMakeFiles/TestShaderTerrainNormal.dir/build
.PHONY : TestShaderTerrainNormal/fast

#=============================================================================
# Target rules for targets named Test3DCase1

# Build rule for target.
Test3DCase1: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 Test3DCase1
.PHONY : Test3DCase1

# fast build rule for target.
Test3DCase1/fast:
	$(MAKE) -f Test3DCase1/CMakeFiles/Test3DCase1.dir/build.make Test3DCase1/CMakeFiles/Test3DCase1.dir/build
.PHONY : Test3DCase1/fast

#=============================================================================
# Target rules for targets named Test3DCase2

# Build rule for target.
Test3DCase2: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 Test3DCase2
.PHONY : Test3DCase2

# fast build rule for target.
Test3DCase2/fast:
	$(MAKE) -f Test3DCase2/CMakeFiles/Test3DCase2.dir/build.make Test3DCase2/CMakeFiles/Test3DCase2.dir/build
.PHONY : Test3DCase2/fast

#=============================================================================
# Target rules for targets named Test3DCase3

# Build rule for target.
Test3DCase3: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 Test3DCase3
.PHONY : Test3DCase3

# fast build rule for target.
Test3DCase3/fast:
	$(MAKE) -f Test3DCase3/CMakeFiles/Test3DCase3.dir/build.make Test3DCase3/CMakeFiles/Test3DCase3.dir/build
.PHONY : Test3DCase3/fast

#=============================================================================
# Target rules for targets named Test3DCase4

# Build rule for target.
Test3DCase4: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 Test3DCase4
.PHONY : Test3DCase4

# fast build rule for target.
Test3DCase4/fast:
	$(MAKE) -f Test3DCase4/CMakeFiles/Test3DCase4.dir/build.make Test3DCase4/CMakeFiles/Test3DCase4.dir/build
.PHONY : Test3DCase4/fast

#=============================================================================
# Target rules for targets named Test3DShading

# Build rule for target.
Test3DShading: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 Test3DShading
.PHONY : Test3DShading

# fast build rule for target.
Test3DShading/fast:
	$(MAKE) -f Test3DShading/CMakeFiles/Test3DShading.dir/build.make Test3DShading/CMakeFiles/Test3DShading.dir/build
.PHONY : Test3DShading/fast

#=============================================================================
# Target rules for targets named Test3DSky

# Build rule for target.
Test3DSky: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 Test3DSky
.PHONY : Test3DSky

# fast build rule for target.
Test3DSky/fast:
	$(MAKE) -f Test3DSky/CMakeFiles/Test3DSky.dir/build.make Test3DSky/CMakeFiles/Test3DSky.dir/build
.PHONY : Test3DSky/fast

#=============================================================================
# Target rules for targets named TestSRGBCase1

# Build rule for target.
TestSRGBCase1: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 TestSRGBCase1
.PHONY : TestSRGBCase1

# fast build rule for target.
TestSRGBCase1/fast:
	$(MAKE) -f TestSRGBCase1/CMakeFiles/TestSRGBCase1.dir/build.make TestSRGBCase1/CMakeFiles/TestSRGBCase1.dir/build
.PHONY : TestSRGBCase1/fast

#=============================================================================
# Target rules for targets named TestSRGBCase2

# Build rule for target.
TestSRGBCase2: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 TestSRGBCase2
.PHONY : TestSRGBCase2

# fast build rule for target.
TestSRGBCase2/fast:
	$(MAKE) -f TestSRGBCase2/CMakeFiles/TestSRGBCase2.dir/build.make TestSRGBCase2/CMakeFiles/TestSRGBCase2.dir/build
.PHONY : TestSRGBCase2/fast

#=============================================================================
# Target rules for targets named TestSRGBCase3

# Build rule for target.
TestSRGBCase3: cmake_check_build_system
	$(MAKE) -f CMakeFiles/Makefile2 TestSRGBCase3
.PHONY : TestSRGBCase3

# fast build rule for target.
TestSRGBCase3/fast:
	$(MAKE) -f TestSRGBCase3/CMakeFiles/TestSRGBCase3.dir/build.make TestSRGBCase3/CMakeFiles/TestSRGBCase3.dir/build
.PHONY : TestSRGBCase3/fast

# Help Target
help:
	@echo "The following are some of the valid targets for this Makefile:"
	@echo "... all (the default if no target is provided)"
	@echo "... clean"
	@echo "... depend"
	@echo "... rebuild_cache"
	@echo "... edit_cache"
	@echo "... Siv3DAppData"
	@echo "... Main"
	@echo "... AsyncFileDownload"
	@echo "... DragDrop"
	@echo "... Microphone"
	@echo "... MaterialIcon"
	@echo "... QRReader"
	@echo "... Terrain"
	@echo "... VideoReader"
	@echo "... WebCam"
	@echo "... AdditionalEmoji"
	@echo "... EmpoweredAudio"
	@echo "... KDTree"
	@echo "... GeoJson"
	@echo "... GrabCut"
	@echo "... Spline2D"
	@echo "... P2WheelJoint"
	@echo "... PackRectangles"
	@echo "... PolygonOutline"
	@echo "... PerlinNoise"
	@echo "... QRCode"
	@echo "... RayIntersection"
	@echo "... NavMesh"
	@echo "... SoftShape"
	@echo "... ViewFrustum"
	@echo "... TestShaderDefault2D"
	@echo "... TestShaderDefault3D"
	@echo "... TestShaderBlockGame"
	@echo "... TestShaderExtractBright"
	@echo "... TestShaderForwardFog"
	@echo "... TestShaderForwardTriplanar"
	@echo "... TestShaderGameOfLife"
	@echo "... TestShaderGrayScale"
	@echo "... TestShaderMultiTextureBlend"
	@echo "... TestShaderMultiShaderMask"
	@echo "... TestShaderPoissonDisk"
	@echo "... TestShaderPosterize"
	@echo "... TestShaderRGBShift"
	@echo "... TestShaderRGBToBGR"
	@echo "... TestShaderSwirl"
	@echo "... TestShaderTerrainNormal"
	@echo "... Test3DCase1"
	@echo "... Test3DCase2"
	@echo "... Test3DCase3"
	@echo "... Test3DCase4"
	@echo "... Test3DShading"
	@echo "... Test3DSky"
	@echo "... TestSRGBCase1"
	@echo "... TestSRGBCase2"
	@echo "... TestSRGBCase3"
.PHONY : help



#=============================================================================
# Special targets to cleanup operation of make.

# Special rule to run CMake to check the build system integrity.
# No rule that depends on this can have commands that come from listfiles
# because they might be regenerated.
cmake_check_build_system:
	$(CMAKE_COMMAND) -S$(CMAKE_SOURCE_DIR) -B$(CMAKE_BINARY_DIR) --check-build-system CMakeFiles/Makefile.cmake 0
.PHONY : cmake_check_build_system
