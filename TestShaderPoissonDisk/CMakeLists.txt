cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(TestShaderPoissonDisk)

set(TestShaderPoissonDiskBundledFilesPath
    /example/shader/
    /example/windmill.png
)

Siv3DAppProjectDataBundle(TestShaderPoissonDisk "${TestShaderPoissonDiskBundledFilesPath}")
