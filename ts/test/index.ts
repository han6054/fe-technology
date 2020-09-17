// 函数
// 有返回值函数
namespace part1 {
    function buildName(firstName: string, lastName: string): string {
        return firstName + lastName
    }
    // 无返回值函数
    function buildName1(firstName: string, lastName: string): void {
        firstName + lastName
    }
}
// 类的继承
namespace part2 {
    class Person {
        name: string;
        age: number;
        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }
    }
    class Employee extends Person {
        department: string;
        constructor(name: string, age: number, department: string) {
            super(name,age);
            this.department = department
        }
    }
    console.log(new Employee('h', 10, 'bj'));
    // 类的修饰符 
    // public    子类 其它任何地方外边都可以访问
    // protecte  子类 都可以访问,其它任何地方不能访问
    // private  子类和其它任何地方都不可以访问


    // 抽象类
    abstract class Animal {
        abstract makeSound(): void;
        move(): void {
            console.log('roaming the earch...');
        }
    }
    class Cat extends Animal{
        makeSound(): void{
            console.log('喵喵喵');
        }
    }
    let cat = new Cat();
    cat.makeSound();

    // 抽象类不能被实例化， 抽象类中abstract关键字定义的方法，必须在派生类中实现
}

namespace part3  {
    // 接口
    interface Person {
        name: string;
        age: number
    }
    // 接口的继承
   interface Shape {
       color: string
   }
   interface Square extends Shape{
        sideLength: number
   }
   // 多个接口继承 implements
   let square = <Square>{};
   square.color = 'blue';
   square.sideLength = 10;
//    type和interface区别
// 1. interface用来定义接口，是真正的类型
// 2. type是一个别名，并不一定是真正类型 
type Name = string; 
type petList = ['dog', 'cat'];
}


namespace part4 {
    // 泛型
    function createArray<T>(length: number, value: T) {
        let result : T[] = [];
        for(let i = 0; i< length; i++) {
            result.push(value);
        }
        return result
    }
    console.log(createArray<number>(3, 1))
    // 泛型类
    class MyArray<T>{
        private list:T[]=[];
        add(value:T) {
            this.list.push(value);
        }
        getMax():T {
            let result=this.list[0];
            for (let i=0;i<this.list.length;i++){
                if (this.list[i]>result) {
                    result=this.list[i];
                }
            }
            return result;
        }
    }
    let arr= new MyArray();
    arr.add(1); arr.add(2); arr.add(3);
    let ret = arr.getMax();
    // console.log(ret);

    // 泛型接口
    interface Calculate{
        <T>(a:T,b:T):T
      }
      let add: Calculate = function<T>(a:T,b:T): T{
        return a;
      }
      console.log(add<number>(1,2));
}