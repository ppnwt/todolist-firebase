deploy:
	tagName="v0.1.10"
	git add .
	git commit -m "tag $tagName"
	git tag $tagName -m "update tag deploy $tagName"
	git push origin $tagName

push:
	git add .
	git commit -m "$(m)"
	git pull --rebase
	git push origin main

test:
	echo "test $(m)"