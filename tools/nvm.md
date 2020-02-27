#####nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
.bash_profile export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node
nvm ls-remote：列出所有可以安装的node版本号
nvm install v10.4.0：安装指定版本号的node
nvm use v10.3.0：切换node的版本，这个是全局的
nvm current：当前node版本
nvm ls：列出所有已经安装的node版本




#####vim 
<1>、输入 vim .bash_profile
<2>、输入 i 进行编辑模式
<3>、然后把需要编辑的内容键入，编辑完之后直接按esc退出编辑模式，
<4>、输入:w进行文件的保存，:wq为保存并退出指令