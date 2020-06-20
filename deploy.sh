#!usr/bin/env sh
#当发生错误中止脚本
set -e
# cd 到构建输出的目录下
cd dist
git init
git add -A
git commit -m 'deploy'
# 这里的access_token是travis设置的环境变量
git push -f https://${vue-cli3-token}@github.com/hejialianghe/hejialianghe.github.io master
cd -  # 返回上一层