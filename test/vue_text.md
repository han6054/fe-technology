###### lifeCycle
- beforeCreate 
在实例化后，数据观测（data observer）之前调用
- created
实例已经创建完成之后被调用，实例完成以下配置：数据观测（data observer），属性和方法的运算，watch/event事件回调，这里没有$el
- beforeMount
在挂在之前调用：相关的render函数首次被调用
- mounted 
el被创建的vm.$el替换,并挂在到实例上去之后调用的钩子
- beforeUpdate
数据更新时调用发生在虚拟dom重新渲染和打补丁之前
- updated 
由于数据更改导致的虚拟dom重新传染和打补丁，在这之后调用的钩子.
- beforeDestroy 
实例销毁之前调用，这一步，实例仍然完全可用
- destroyed 
Vue 实例销毁后调用，调用后，Vue实例指式的所有东西都会解绑，所有事件监听都会被移除，所有子实例也会被销毁，该钩子在服务器端不可用
###### 说明一下vue双向绑定
vue使用object.defineProperty实现数据劫持(Observe)，初始化时通过每一个属性的getter方法，绑定观察者(Dep)，Watcher是Compile和observe桥梁，在模版编译阶段绑定对应的watcher，observe如果属性改变触发setter方法执行Dep对应的Watcher回调函数更新视图。