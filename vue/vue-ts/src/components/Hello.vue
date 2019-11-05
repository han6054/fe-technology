<template>
    <div>
        {{msg}}
        {{name}}
        <input type="text" @keyup.enter="addFeatures">
        <ul>
            <li v-for="f in features" :key="f.id">{{f.name}}</li>
            <li>{{FeatureCount}}</li>
        </ul>
    </div>
</template>
<script lang="ts">
    import {Prop, Component, Vue, Emit, Watch} from 'vue-property-decorator'

    export class Feature {
        constructor(public id: number, public name:string, public version: string) {}
    }

    // 泛型  在定义接口的时候使用的时候指定类型
    interface Result<T> {
        ok: 0 | 1;
        data: T[];
    }
    function getData<T>(): Promise<Result<T>> {
        return new Promise<Result<T>>(resolve => {
             const data: any[] = [
                 {id: 100, name: 'apple', version: '1.0'},
                 {id: 101, name: 'orange', version: '1.0'},
             ];
             setTimeout(() => {
                 resolve({ok: 1, data } as Result<T>);
             })
        })
    }


    @Component
    export default class Hello extends Vue {
        // private 仅当前类可用
        // protected 子类也可以用
        // public 公共类型
        @Prop() private msg!: string;
        @Prop() private name?: string;

        private features: Feature[] = [];
        private counter:number = 0;

        async created() {
            const result = await getData<Feature>();
            this.features = result.data
        }
         @Emit()
         private addFeatures(e:any) {
            const features = {id: this.features.length + 1, name: e.target.value, version: '1.0'};
             this.features.push(features);
             e.target.value = '';
             this.counter ++
            return features
         }
        // addFeatures(e: any) {
        //     this.features.push({id: this.features.length + 1, name: e.target.value, version: '1.0'});
        //     e.target.value = ''
        // }

        // 计算属性
        get FeatureCount() {
            return this.features.length
        }
        // watch使用
        @Watch('counter')
        changeCounter(val: string, oldVal: string) {
            console.log(val);
        }
    }
    //-----------------------
    // 定义
    let list: Array<string>

    // 函数
    function greeting(person: string): string {
        return 'hello' + person
    }

    // void
    function warn(): void {
        alert("warning!!!")
    }

    class Shape {
        public area: number;

        constructor(public color: string, width: number, height: number) {
            this.area = width * height
        }
    }

    class Square extends Shape {
        constructor(color: string, side: number) {
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

        set fullName(newName: string) {
            this.firstName = newName.split(' ')[0];
            this.lastName = newName.split(' ')[1];
        }
    }

    const employee = new Employee();
    employee.fullName = 'joker jj'; // 好处：不能直接访问内部私有属性

    // 接口
    interface Person {
        firstName: string;
        lastName: string
    }

    function greet(person: Person) {
        return 'Hello' + person.firstName + ' ' + person.lastName;
    }

    const user = {firstName: 'Nick', lastName: 'User', foo: 'aa'};
    greet(user);

    // (1) 面向接口编程入参可以是一个函数
    interface Person1 {
        firstName: string;
        lastName: string;

        sayHello(): string
    }

    // (2) 类实现一个接口
    class Greeter implements Person1 {
        constructor(public firstName: string, public lastName: string) {
        }

        sayHello() {
            return 'Hello' + this.firstName + ' ' + this.lastName;
        }
    }

    // function identity<T>(arg:T): T {
    //     return arg;
    // }
    // console.log(identity('hello'));
    // console.log(identity(123));

</script>
<style scoped></style>