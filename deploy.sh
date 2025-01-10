set -e

# 生成静态文件
pnpm run docs:build

# 进入生成的文件夹
cd docs/.vitepress/dist

git init
git add -A
git commit -m 'deploy'
# git push origin master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@gitee.com:xiaoxi77/el2package-ui.git master:master

cd -

echo "Press any key to continue..."
read -n 1
