let {createElement} = require('./element.js')

let ul1 = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item'}, ['1']),
    createElement('li', {class: 'item'}, ['2']),
    createElement('li', {class: 'item'}, ['3'])
])
let root = ul1.render();
document.body.appendChild(root)