- eventLoop 
javascript会维护一个执行栈，然后逐行执行代码，（执行栈先进后出）
如果碰到异步代码(如：Promise.then,AJAX,setTimeout等等)，那么他会把这些代码交给浏览器其他线程去执行，直到当前代码结束
同时浏览器的其他线程在要处理异步代码执行前的准备工作时（比如说AJAX，鼠标事件，定时器事件等),浏览器会把当前的异步代码放入到一个异步队列中（queue先进先出）
当主线程执行完当前代码时，会去异步队列检查当前是否有任务要执行，如果有，那么逐行执行，如果其中碰到了异步代码，那么嫁给浏览器其他线程去处理，然后跳过这行代码继续执行，知道当前代码结束
然后检查异步队列，如此循环往复

- Microtrask:
Process.nextTick,Promise,Object.observe,MutationObserver
- Macrotask:
setTimeout,setInterval,setImmediate,I/O,UI渲染,<script>中的js代码；

