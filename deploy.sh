#!/bin/sh

tagName="v0.1.2"
git add .
git commit -m "tag $tagName"
git tag $tagName -m "update tag deploy $tagName"
git push origin --tags
