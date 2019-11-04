<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        nuxt_project
      </h1>
      <button @click="$router.push('/user/user')">user go List</button>
      <button @click="$router.push({name:'user-detail', query: {id: 1}})">user go detail</button>
      <button @click="$router.push({name:'user-id', params: {id: 2}})">用户详情</button>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

function getData() {
     return new Promise((resolve) => {
        setTimeout(() => {
            resolve(123321)
        })
    })
}

export default {
  layout: 'users',
    head: {
    title: '主页'
  },
   async asyncData({params, $axios}) {
       // 返回的user 会和页面的data合并
       // const data = await $axios.$get(`/api/users/${params.id}`)
       // if(data.ok) {
       //     return  {user: data.user}
       // }
   },
    data() {
      return {
          list:[1,2,3,4]
      }
    },
  components: {
    Logo
  }
}
</script>
<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
