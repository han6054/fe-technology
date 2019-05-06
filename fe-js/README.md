

宏任务：`(  setTimediate ie 支持)、 setTimeout、MessageChanel`

微任务：`promise.then、MutationObserver、nextTick`

---

`node`适合高并发web系统,  (  只要是读取文件等 )
-  适合i/o密集型 
-  不适合cpu密集型 ( 运算 加密 解密 ）
-  当应用程序需要处理大量并发的输入输出，而在向客户端响应之前，应用程序并不需要进行非常复杂的处理。( 聊天服务器  电子商务网站 )


