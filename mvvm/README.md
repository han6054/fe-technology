
最近面试了好多前端应聘者, 每个人都了解Vue中mvvm实现原理，回答一般都是根据 *Object.defineproperty* 监听属性变化，触发set 修改input变化。对于页面单一个值的变化是可以，但是正常的使用来说，我们不过有多个input,还有多个指令(v-bind、v-model、v-html, v-text)等，还包括({{xxx}})语法，都需要找到对应的set触发，前提要找到当前的元素和文本节点进行修改value，
#### 双向绑定原理为：

- Complier（编译器）
 
通过递归查找模板内所有元素，对 *{{}}* 或者 *v-* 的元素,获取他绑定的对象中对应的属性值和当前的元素进行，赋值。

- Watcher (观察者) Dep（订阅者）

Watcher是Complier和Observer的桥梁，对于每个需要变化的属性绑定一个观察者和对应的回调函数。
每次绑定Watcher，getter获取属性值,添加到订阅器Dep上


- Observer (数据劫持)

通过Watcher的实例中getter获取属性值, 触发Observer中的getter方法， 每个对象创建一个新的Dep实例 把当前订阅者放到订阅器中。
发现当前属性变化，执行Dep中对应Watcher中回调函数update方法，更新数据


为了对mvvm有一个更高级的认识，实现一个简易的mvvm代码







