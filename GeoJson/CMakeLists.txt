cmake_minimum_required(VERSION 3.13)

add_executable(GeoJson)

Siv3DAppSetProjectDefaultConfig(GeoJson)

target_sources(GeoJson
    PRIVATE
        Main.cpp
)

set(GeoJsonBundledFilesPath
    /example/geojson/countries.geojson
)

Siv3DAppProjectDataBundle(GeoJson "${GeoJsonBundledFilesPath}")
