# 确保脚本抛出遇到的错误
###
 # @Author: yangyu 1431330771@qq.com
 # @Date: 2023-09-04 23:53:52
 # @LastEditors: wangchao 6141364@qq.com
 # @LastEditTime: 2024-06-27 15:59:54
 # @FilePath: \el2package-ui\deploy.sh
 # @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
### 


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