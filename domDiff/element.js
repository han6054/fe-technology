
let Utils = require('./utils')

class Element {
    /*
      @tagName 标签名
      @attrs 属性对象
      @children 子元素数组
    */
    constructor(tagName, attrs, children) {
        this.tagName = tagName;
        this.attrs = attrs;
        this.children = children || [];
    }
    render() {
        let element = document.createElement(this.tagName); 
        // real dom add attrs
        for(let attr in this.attrs) {
            Utils.setAttr(element, attr, this.attrs[attr])
        }
        // 递归遍历，深度优先
        this.children.forEach(child => {
           console.log(child instanceof Element)
           let childElement = (child instanceof Element)? child.render(): document.createTextNode(child);    
           element.appendChild(childElement);
        });
        return element
    }
}
function createElement(tagName, attrs, children) {
  return new Element(tagName, attrs, children);
}
module.exports = { createElement };