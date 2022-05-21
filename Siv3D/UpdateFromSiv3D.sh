#!/bin/bash

Siv3DRoot="../../OpenSiv3D"

cp -r ${Siv3DRoot}/Siv3D/include .
cp -r ${Siv3DRoot}/Web/Package/lib/Siv3D/* ./lib/
cp -r ${Siv3DRoot}/Web/Package/lib/lib*.a ./lib/
cp -r ${Siv3DRoot}/Web/App/resources .
cp -r ${Siv3DRoot}/Web/App/example .
