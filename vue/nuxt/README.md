
``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).



### 1.nuxt自带路由

pages中自动配置路由文件可以指定到目录，不需要配置路由
路由导航使用`<nuxt-lunk>`

基础路由：
```
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```
那么，Nuxt.js 自动生成的路由配置如下：
```
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```
动态路由： 
```
pages/
--| user/
-----| _id.vue
-----| index.vue
--| _.vue
--| index.vue
```
```
 <button @click="$router.push({name:'user-id', params: {id: 2}})">用户详情</button>

 另一种方式，子路由不需要_id.vue这种方式，直接使用query传递的方式:
 <button @click="$router.push({name:'user-id', params: {id: 2}})">用户详情</button>
```
### 自定义布局
layout目录中，每一个文件，页面中都可使用`layout`属性引用。

### 异步数据
`asyncData`（只限于页面组件）在服务器或者路由更新之前被调用，最终回把页面`data`合并一起返回给当前组件。






