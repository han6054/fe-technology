FROM node
LABEL name='vue-back'
LABEL veriosn='1.0'
#将项目拷贝到node镜像中的app文件夹
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD npm start 


