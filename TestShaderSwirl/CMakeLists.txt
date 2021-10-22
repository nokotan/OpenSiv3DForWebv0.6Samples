cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(TestShaderSwirl)

set(TestShaderSwirlBundledFilesPath
    /example/shader/
    /example/windmill.png
)

Siv3DAppProjectDataBundle(TestShaderSwirl "${TestShaderSwirlBundledFilesPath}")
