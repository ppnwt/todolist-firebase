#!/bin/sh

git add .
msg="update readme site"

if [ $# -eq 1 ]; then msg="$1"; fi

git commit -m "$msg"
git pull --rebase

build="BUILD"
if [[ $msg == *"$build"* ]]; then
  tagName="v0.1.4"
  git tag $tagName -m "update tag deploy $tagName"
  git push origin --tags
else
   git push origin main
fi