// 存储器
namespace a {
    class Person {
        myname: string;
        constructor(name: string) {
            this.myname = name;
        }
        get name() {
            return this.myname;
        }
        set name(newVal: string) {
            this.myname = newVal.toUpperCase()
        }
    }
    let p = new Person('hhh');
    console.log(p.name);
    p.name = 'jjj';
    console.log(p.name);
}

namespace b {
    class Person {
        constructor(public name: string) {

        }
    }
    let p = new Person('jj');
    console.log(p.name);
}