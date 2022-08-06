#!/bin/sh

tagName="v0.1.8"
git add .
git commit -m "tag $tagName"
git tag $tagName -m "update tag deploy $tagName"
git push origin $tagName
