
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

// patch
let allPaches = {};
let index = 0; //默认哪个需要补丁
export default function patch(dom, patches) {
    allPaches = patches;
    walk(dom);
}

function walk(dom) {
    let currentPatche = allPaches[index++];
    let childNodes = dom.childNodes;
    childNodes.forEach(element => walk(element));
    if (currentPatche > 0) {
        doPatch(dom, currentPatche);
    }
}

function doPatch(node, patches) {
    patches.forEach(patch => {
        switch (patch.type) {
            case 'ATTRS':
                Utils.setAttr(patch.attrs)//别的文件方法
                break;
            case 'TEXT':
                node.textContent = patch.text;
                break;
            case 'REPLACE':
                let newNode = patch.newNode instanceof Element ? render(patch.newNode) : document.createTextNode(patch.newNode);
                node.parentNode.replaceChild(newNode, node)
                break;
            case 'REMOVE':
                node.parentNode.removeChild(node);
                break;
        }
    })
}

module.exports = { createElement };