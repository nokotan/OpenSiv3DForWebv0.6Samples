cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(TestShaderPosterize)

set(TestShaderPosterizeBundledFilesPath
    /example/shader/
    /example/windmill.png
)

Siv3DAppProjectDataBundle(TestShaderPosterize "${TestShaderPosterizeBundledFilesPath}")
