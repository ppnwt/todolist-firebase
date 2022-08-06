#!/bin/sh

git add .
msg="general commit message.."

if [ $# -eq 1 ]; then msg="$1"; fi

git commit -m "$msg"
git pull --rebase
git push origin main