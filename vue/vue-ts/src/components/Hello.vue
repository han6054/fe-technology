<template>
    <div>
        {{msg}}
        {{name}}
        <input type="text" @keyup.enter="addFeatures">
        <ul>
            <li v-for="f in feature" :key="f.id">{{f.name}}</li>
            <li>{{FeatureCount}}</li>
        </ul>
    </div>
</template>
<script lang="ts">
    import {Prop, Component, Vue} from 'vue-property-decorator'

    class Feature {
        constructor(public id:number, public name:string, public version:string) {}
    }

    @Component
    export default class Hello extends Vue {
        // private 仅当前类可用
        // protected 子类也可以用
        // public 公共类型
        @Prop() private msg!: string;
        @Prop() private name?: string;

        private feature:Feature[] = [
            {id:11, name:'🍎', version:'1.0'},
            {id:12, name:'🍊', version:'1.0'},
        ];
        addFeatures(e:any) {
           this.feature.push({id:this.feature.length +1, name:e.target.value, version:'1.0'});
           e.target.value = ''
        }
        // 计算属性
        get FeatureCount () {
           return this.feature.length
        }
    }
    //-----------------------
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

    class Shape {
        public area:number;

        constructor(public color:string, width: number, height: number) {
           this.area = width * height
        }
    }
    class Square extends Shape {
        constructor(color:string, side: number) {
            super(color, side, side)
        }
        shout() {
            return '我是' + this.color + this.area + '平方厘米'
        }
    }
    const square = new Square('blue', 3).shout()
    console.log(square)


    class Employee {
        private firstName = 'Mike';
        private lastName = 'James';
        get fullName(): string {
            return this.firstName + ' ' + this.lastName
        }
        set fullName(newName:string) {
            this.firstName = newName.split(' ')[0];
            this.lastName = newName.split(' ')[1];
        }
    }
    const employee = new Employee();
    employee.fullName = 'joker jj'; // 好处：不能直接访问内部私有属性

    // 接口
    interface Person {
        firstName:string;
        lastName:string
    }
    function greet(person: Person) {
        return 'Hello' + person.firstName + ' ' + person.lastName;
    }
    const user = {firstName: 'Nick', lastName: 'User', foo:'aa'};
    greet(user);
    // (1) 面向接口编程入参可以是一个函数
    interface Person1 {
        firstName:string;
        lastName:string;
        sayHello():string
    };
    // (2) 类实现一个接口
    class Greeter implements Person1 {
        constructor(public firstName:string, public lastName:string) {}
        sayHello(){
            return 'Hello' + this.firstName + ' ' + this.lastName;
        }
    }

</script>
<style scoped></style>