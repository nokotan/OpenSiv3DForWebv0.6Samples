cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(PolygonHole)

set(PolygonHoleBundledFilesPath
    /example/texture/ground.jpg
    /example/obj
)

Siv3DAppProjectDataBundle(PolygonHole "${PolygonHoleBundledFilesPath}")
