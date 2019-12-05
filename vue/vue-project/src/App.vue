<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
<!--            <button v-has="'edit'">编辑</button>-->
<!--            <button v-has="'add'">添加</button>-->
        <router-view></router-view>
        <div>
            <router-link to="/">home</router-link>
            <router-link to="/about">about</router-link>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'app',
        directives: { // 自定义指令， 按钮权限设置
            has: {
                inserted(el, bindings, vnode) {
                    let flag = vnode.context.$store.state.btnPermission[bindings['value']];
                    !flag && el.remove()

                }
            }
        },
        components: {

        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
