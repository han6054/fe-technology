<template>
  <div>
    user detail page
    id:{{$route.query.id}}
  </div>
</template>
<script>
  export default {
     async asyncData({query, error}) {
         console.log(query, '--------asyncData')
     }
  }
</script>
