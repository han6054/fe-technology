#!/bin/bash
WORK_PATH = '服务器中前端项目目录/vue-front'
cd WORK_PATH
echo '先清除老代码'
git reset --hard orgin/master
git clean -f
echo '拉取最新到吗'
git pull orgin master
echo '开始编译'
npm run build
docker build -t vue-front:1.0 .
echo '停止旧容器，并删除旧容器'
docker stop vue-front-container
docker rm vue-front-container
echo '启动新容器'
docker container run -p 80:80 --name vue-front-container -d vue-front

