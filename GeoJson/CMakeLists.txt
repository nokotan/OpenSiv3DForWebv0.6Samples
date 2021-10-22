cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(GeoJson)

set(GeoJsonBundledFilesPath
    /example/geojson/countries.geojson
)

Siv3DAppProjectDataBundle(GeoJson "${GeoJsonBundledFilesPath}")
