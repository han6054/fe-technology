<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Hello msg="TS base" name="joker" @add-features="xxx"></Hello>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Hello, { Feature } from '@/components/Hello.vue'

export default {
  components: {
    Hello
  },
  created() {
    console.log('home');
  },
  methods: {
    xxx(features:Feature) {
      console.log(features.name);
    }
  }
}
</script>
