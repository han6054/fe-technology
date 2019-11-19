class Complier {
    constructor(el, vm) {
        // 判断el属性是否是元素
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        //获取到模板的属性放到fragment赋值完成后中统一渲染，避免dom回流
        this.vm = vm
        let fragment = this.node2fragment(this.el)
            // 把节点和内容进行替换


        // 编译模板
        this.complie(fragment)

        // 把内容塞到页面
        this.el.appendChild(fragment)
    }
    isElementNode(node) {
        return node.nodeType === 1;
    }
    isDirective(attrName) {
            return attrName.startsWith('v-')
        }
        // 编译元素
    complieElement(node) {
            let attributes = node.attributes;
            [...attributes].forEach(attr => {
                let { name, value: expr } = attr;
                if (this.isDirective(name)) {
                    let [, directive] = name.split('-')
                    let [directiveName, eventName] = directive.split(':')
                        // 调用不同指令来处理
                    ComplieUtil[directiveName](node, expr, this.vm, eventName)
                }
            })
        }
        // 编译文本
    complieText(node) {
        let content = node.textContent
        if (/\{\{(.+?)\}\}/.test(content)) {
            ComplieUtil['text'](node, content, this.vm)
        }
    }
    complie(fragment) { // 用来编译内存中dom节点 找到v-,{{}}
        let childNodes = fragment.childNodes;
        [...childNodes].forEach(child => {
            if (this.isElementNode(child)) {
                this.complieElement(child)
                this.complie(child)
            } else {
                this.complieText(child)
            }
        });
    }
    node2fragment(node) {
        let fragment = document.createDocumentFragment();
        let firstChild;
        while (firstChild = node.firstChild) {
            fragment.appendChild(firstChild)
        }
        return fragment
    }
}

class Observer {
    constructor(data) {
        this.observer(data);
    }
    observer(data) {
        if (data && typeof data == 'object') {
            for (let key in data) {
                this.denfenReactive(data, key, data[key]);
            }
        }
    }
    denfenReactive(obj, key, value) {
        this.observer(value);
        let dep = new Dep(); // $data中所有属性添加一个发布订阅的功能
        Object.defineProperty(obj, key, {
            get() {
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set: (newValue) => {
                if (value !== newValue) {
                    this.observer(newValue)
                    value = newValue
                    dep.notify()
                }
            }
        })
    }
}

// 观察者 (发布订阅)
class Dep {
    constructor() {
        this.subs = []
    }
    addSub(Watcher) {
         this.subs.push(Watcher)
     }
     // 发布
    notify() {
        this.subs.forEach(watcher => watcher.update())
    }
}

class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm
        this.expr = expr
        this.cb = cb
        this.oldVal = this.get(this.vm, this.expr)
    }
    get(vm, expr) {
        Dep.target = this
        let value = ComplieUtil.getVal(vm, expr)
        Dep.target = null
        return value
    }
    update() {
        let newVal = ComplieUtil.getVal(this.vm, this.expr)
        if (newVal !== this.oldVal) {
            this.cb(newVal)
        }
    }
}

ComplieUtil = {
    getVal(vm, expr) {
        return expr.split('.').reduce((data, current) => {
            return data[current]
        }, vm.$data)
    },
    setVal(vm, expr, value) {
        expr.split('.').reduce((data, current, index, arr) => {
            if (index == arr.length - 1) {
                return data[current] = value
            }
            return data[current]
        }, vm.$data)
    },
    model(node, expr, vm) { // node(节点) expr(表达式) vm(当前实例)
        new Watcher(vm, expr, (newVal) => {
            node.value = newVal
        })
        node.addEventListener('input', (e) => {
            let value = e.target.value
            this.setVal(vm, expr, value)
        })
        let value = this.getVal(vm, expr)
        node.value = value
    },
    getContentValue(vm, expr) {
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(vm, args[1])
        })
    },
    on(node, expr, vm, eventName) {
        node.addEventListener(eventName, (e) => {
            vm[expr] && vm[expr].call(vm, e)
        })
    },
    text(node, expr, vm) {
        let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            new Watcher(vm, args[1], () => {
                node.textContent = this.getContentValue(vm, expr)
            })
            return this.getVal(vm, args[1])
        })
        node.textContent = content
    }
}
class Vue {
    constructor(options) {
        this.$el = options.el
        this.$data = options.data
        let computed = options.computed
        let methods = options.methods
            // 页面模板编译
        if (this.$el) {

            // 数据监听阶段,劫持到数据变化
            new Observer(this.$data)

            for (let key in computed) {
                Object.defineProperty(this.$data, key, {
                    get: () => {
                        return computed[key].call(this)
                    }
                })
            }

            for (let key in methods) {
                Object.defineProperty(this, key, {
                    get() {
                        return methods[key]
                    }
                })
            }

            this.proxyVm(this.$data)

            new Complier(this.$el, this);


        }
    }
    proxyVm(data) {
        for (let key in data) {
            Object.defineProperty(this, key, {
                get() {
                    return data[key]
                }
            })
        }
    }
}
