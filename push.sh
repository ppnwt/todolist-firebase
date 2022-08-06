#!/bin/sh

git add .
msg="update readme site"

if [ $# -eq 1 ]; then msg="$1"; fi

git commit -m "$msg"
git pull --rebase
git push origin main