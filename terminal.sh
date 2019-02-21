version="V.1.0.13"

git add .

git commit -m "version $version"

git push origin development

git checkout -b release/$version

git add .

git commit -m "new version is added - $version"

git push -u release/$version

git checkout master

git merge --no-ff release/$version

git push

git tag -a $version -m "new release version $version"

git push origin --tags

git checkout development
