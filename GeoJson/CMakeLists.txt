cmake_minimum_required(VERSION 3.13)

add_executable(GeoJson)

Siv3DAppSetProjectDefaultConfig(GeoJson)

target_sources(GeoJson
    PRIVATE
        Main.cpp
)

set_target_properties(GeoJson
    PROPERTIES LINK_FLAGS 
        "${Siv3DAppLinkerFlags} --preload-file ${CMAKE_SOURCE_DIR}/Siv3D/example/geojson/countries.geojson@/example/geojson/countries.geojson"
)
