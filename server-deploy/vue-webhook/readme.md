#### 持续集成和部署
技术栈 前台Vue,后台Node.js
服务器 前台nginx,后台Node.js


webhook.js
 
- 目的是每次前端项目（vue-front）或者后端项目(vue-back)代码发布的时候，自动更新项目代码，生成新的`docker`实例


- 设置步骤 gitHub => settings => Webhooks 

1.github添加webhook url （add webhook）

2.添加服务器地址和api 比如： http://xxx.xxx.x.x/webhook

3.Just the push event. （如果前端或者后端项目向仓库代码push就向/webhook发起请求）

4.分别添加项目执行文件.bash文件

5.前端和后端项目中分别添加`Dockerfile`生成镜像


##### 配置服务器
- 更新系统
```
#升级所有包同时也升级软件和系统内核
yum update 
#只升级所有包，不升级软件和系统内核
yum upgrade 
```
- docker 

Docker 属于 Linux 容器的一种封装，提供简单易用的容器使用接口。
Docker 将应用程序与该程序的依赖，打包在一个文件里面。运行这个文件，就会生成一个虚拟容器。程序在这个虚拟容器里运行，就好像在真实的物理机上运行一样

- 安装docker/阿里云加速
```
yum install -y yum-utils   device-mapper-persistent-data   lvm2
yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
yum install -y docker-ce docker-ce-cli containerd.io


mkdir -p /etc/docker
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://fwvjnv59.mirror.aliyuncs.com"]
}
EOF
# 重载所有修改过的配置文件
systemctl daemon-reload
systemctl restart docker
```

