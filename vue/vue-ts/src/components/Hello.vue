<template>
    <div>
        {{msg}}
        {{name}}
        <input type="text" @keyup.enter="addFeatures">
        <ul>
            <li v-for="f in feature" :key="f">{{f}}</li>
        </ul>
    </div>
</template>
<script lang="ts">
    import {Prop, Component, Vue} from 'vue-property-decorator'
    // 定义
    let list:Array<string>
    // 函数
    function greeting(person:string):string {
        return 'hello' + person
    }
    // void
    function warn():void {
        alert("warning!!!")
    }



    @Component
    export default class Hello extends Vue {
        // private 仅当前类可用
        // protected 子类也可以用
        // public 公共类型
        @Prop() private msg!: string;
        @Prop() private name?: string;

        private feature = ['🍎', '🍊'];
        addFeatures(e:any) {
           this.feature.push(e.target.value);
           e.target.value = ''
        }
    }
</script>
<style scoped></style>