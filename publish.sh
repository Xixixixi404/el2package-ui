# 确保脚本抛出遇到的错误
#set -e
# git add .
# git commit -m "publish to npm"
# 版本号自增
npm version patch

# 打包
npm run lib

echo '切到官方源'
# 切到官方源
npm config set registry https://registry.npmjs.org/ 

# 发布
echo '发布'
npm publish

# 切到镜像源
echo '切到镜像源'
npm config set registry https://registry.npmmirror.com

echo "Press any key to continue..."
read -n 1
