cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(GrabCut)

set(GrabCutBundledFilesPath
    /example/windmill.png
)

Siv3DAppProjectDataBundle(GrabCut "${GrabCutBundledFilesPath}")
