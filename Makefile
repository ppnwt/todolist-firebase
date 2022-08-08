deploy:
	tagName="v0.1.8"
	git add .
	git commit -m "tag $tagName"
	git tag $tagName -m "update tag deploy $tagName"
	git push origin $tagName

push:
	git add .
	msg="general commit message.."
	if [ $# -eq 1 ]; then msg="$1"; fi
	git commit -m "$msg"
	git pull --rebase
	git push origin main