cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(TestShaderGameOfLife)

set(TestShaderGameOfLifeBundledFilesPath
    /example/shader/
)

Siv3DAppProjectDataBundle(TestShaderGameOfLife "${TestShaderGameOfLifeBundledFilesPath}")
