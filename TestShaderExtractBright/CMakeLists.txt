cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(TestShaderExtractBright)

set(TestShaderExtractBrightBundledFilesPath
    /example/shader/
)

Siv3DAppProjectDataBundle(TestShaderExtractBright "${TestShaderExtractBrightBundledFilesPath}")
