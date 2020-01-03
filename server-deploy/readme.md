webhook.js
 
- 目的是每次前端项目（vue-front）或者后端项目(vue-back)代码发布的时候，自动更新项目代码，生成新的`docker`实例


- 设置步骤 gitHub => settings => Webhooks 

1.github添加webhook url （add webhook）

2.添加服务器地址和api 比如： http://xxx.xxx.x.x/webhook

3.Just the push event. （如果前端或者后端项目向仓库代码push就向/webhook发起请求）

4.分别添加项目执行文件.bash文件

5.前端和后端项目中分别添加`Dockerfile`生成镜像

