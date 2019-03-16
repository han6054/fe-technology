function Animal(type) {
    this.type = type;
}
Animal.prototype.say = function() {
    console.log('say')
}

function mockNew() {
    let Constructor = [].shift.call(arguments);
    let obj = {}
    obj.__proto__ = Constructor.prototype
    Constructor.apply(obj, arguments)
    return obj
}
let animal = mockNew(Animal, 'dog')
    // let animal = new Animal('dog')
console.log(animal.type)
animal.say()