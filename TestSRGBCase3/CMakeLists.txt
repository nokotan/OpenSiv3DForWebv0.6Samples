cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(TestSRGBCase3)

set(TestSRGBCase3BundledFilesPath
    /example/windmill.png
    /example/texture/earth.jpg
)

Siv3DAppProjectDataBundle(TestSRGBCase3 "${TestSRGBCase3BundledFilesPath}")
