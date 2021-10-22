cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(Test3DCase2)

set(Test3DCase2BundledFilesPath
    /example/texture/ground.jpg
    /example/obj
)

Siv3DAppProjectDataBundle(Test3DCase2 "${Test3DCase2BundledFilesPath}")
