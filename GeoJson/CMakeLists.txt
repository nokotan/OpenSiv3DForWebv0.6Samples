cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(GeoJson)

set(GeoJsonBundledFilesPath
    /resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp
    /example/geojson/countries.geojson
)

Siv3DAppProjectDataBundle(GeoJson "${GeoJsonBundledFilesPath}")
