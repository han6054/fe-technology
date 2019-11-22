try {
    module.exports = MyPromise;
} catch (e) {}

function MyPromise(executor) {
    let self = this;

    self.status = 'pending';
    self.onResolvedCallback = [];
    self.onRejectedCallback = [];

    function resolve(value) {
        if (value instanceof Promise) {
            value.then(resolve, reject)
        }
        if (self.status === 'pending') {
            self.status = 'resolved';
            self.data = value;
            setTimeout(() => {
                self.onResolvedCallback.forEach(callback => {
                    callback(value)
                })
            })
        }
    }

    function reject(reason) {
        if (self.status === 'pending') {
            self.status = 'rejected';
            self.data = reason;
            setTimeout(() => {
                self.onRejectedCallback.forEach(callback => {
                    callback(reason)
                })
            })
        }
    }

    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    let then;
    let thenCalledRThrow = false;

    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise!'));
    }
    if (x instanceof Promise) {
        if (x.status === 'pending') {
            x.then(function (v) {
                resolvePromise(promise2, v, resolve, reject)
            })
        } else {
            x.then(resolve, reject)
        }
        return
    }
    console.log(`x typeOf is ${typeof x}`);
    if(x !== null && (typeof x === 'function') || (typeof x === 'object')){
       try {
          then = x.then;
          if(then === 'function') {
              then.call(x, y=> {
                  if(thenCalledRThrow) return;
                  thenCalledRThrow = true;
                  resolvePromise(promise2, y, resolve, reject)
              },(r)=> {
                  if (thenCalledRThrow) return
                  thenCalledRThrow = true
                  return reject(r)
              })
          } else {
              resolve(x)
          }
       }catch (e) {
           if(thenCalledRThrow) return;
           thenCalledRThrow = true;
           return reject(e)
       }
    } else {
        resolve(x)
    }
}
MyPromise.prototype.then = function(onResolved, onRejected) {
    let self = this;
    let promise2;
    onResolved = typeof onResolved === 'function' ? onResolved: (v)=> v;
    onRejected = typeof onRejected === 'function' ? onRejected: (r)=> {throw r};
    console.log(`in then() status is ${self.status} `)
    if(self.status === 'pending') {
        return promise2 = new Promise(function(resolve, reject) {
            self.onResolvedCallback.push(function(value) {
                try {
                    let x = onResolved(value);
                    console.log(x, `in then() onResolvedCallback push this ${x}`)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (r) {
                    reject(r)
                }
            });

            self.onRejectedCallback.push(function(reason) {
                try {
                    let x = onRejected(reason);
                    console.log(x, `in then() onRejectedCallback push this ${x}`)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (r) {
                    reject(r)
                }
            })
        })
    }

    if(self.status === 'resolved') {
        return promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onResolved(self.data);
                    resolvePromise(promise2,x ,resolve, reject)
                }catch (e) {
                    reject(e)
                }
            })
        })
    }

    if(self.status === 'rejected') {
        return promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(self.data);
                    resolvePromise(promise2,x ,resolve, reject)
                }catch (e) {
                    reject(e)
                }
            })
        })
    }

};
MyPromise.resolve = function (val) {
    return new Promise((resolve,reject) => {
        resolve(val)
    })
};

MyPromise.reject = function (reason) {
    return new Promise((resolve, reject)=>{
        reject(reason)
    })
}
MyPromise.race = function (promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
            promise.then(resolve, reject)
        })
    })
}
MyPromise.all = function (promises){
    return new Promise((resolve,reject) => {
        let resolvedCounter = 0;
        let promiseNum = promises.length;
        let resolvedValues = new Array(promiseNum);
        for(let i = 0;i<promiseNum;i++) {
            MyPromise.resolve(promises[[i]]).then((val)=> {
                resolvedCounter++;
                resolvedValues[i] = val;
                if(resolvedCounter === promiseNum) {
                    return resolve(resolvedValues)
                }
            }, (r)=> {
                return reject(r)
            })
        }
    });
}
