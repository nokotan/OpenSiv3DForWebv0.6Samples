cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(SoftShape)

set(SoftShapeBundledFilesPath
    /example/shader/
)

Siv3DAppProjectDataBundle(SoftShape "${SoftShapeBundledFilesPath}")
