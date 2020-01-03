#!/bin/bash
WORK_PATH = '服务器后台项目目录/vue-back'
cd WORK_PATH
echo '先清除老代码'
git reset --hard orgin/master
git clean -f
echo '拉取最新到吗'
git pull orgin master
echo '开始构建'
docker build -t vue-back .
echo '停止旧容器，并删除旧容器'
docker stop vue-back-container
docker rm vue-back-container
echo '启动新容器'
#端口映射3000
docker container run -p 3000:3000 --name vue-back-container -d vue-back

