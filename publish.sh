# 确保脚本抛出遇到的错误
###
 # @Author: yangyu 1431330771@qq.com
 # @Date: 2023-09-04 23:53:52
 # @LastEditors: wangChao 6141364@qq.com
 # @LastEditTime: 2024-09-22 11:34:46
 # @FilePath: \el2package-ui\publish.sh
 # @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
### 
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