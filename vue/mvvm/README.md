

- Complier（编译器）
 
通过递归查找模板内所有元素，对 *{{}}* 或者 *v-* 的元素,获取他绑定的对象中对应的属性值和当前的元素进行，赋值。

- Watcher (观察者) Dep（订阅者）

Watcher是Complier和Observer的桥梁，对于每个需要变化的属性绑定一个观察者和对应的回调函数。
每次绑定Watcher，getter获取属性值,添加到订阅器Dep上


- Observer (数据劫持)

通过Watcher的实例中getter获取属性值, 触发Observer中的getter方法， 每个对象创建一个新的Dep实例 把当前订阅者放到订阅器中。
发现当前属性变化，执行Dep中对应Watcher中回调函数update方法，更新数据


为了对mvvm有一个更高级的认识，实现一个简易的mvvm代码







