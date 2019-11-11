
// https://github.com/xieranmaya/blog/issues/3

function MyPromise(executor) {
    let self = this;

    self.status = 'pending';
    self.data = undefined;
    self.reason = undefined;
    self.onResolveCallBack = [];
    self.onRejectCallback = [];

    function resolve(value) {
        if (self.status === 'pending') {
            self.status = 'resolved';
            self.data = value;
            setTimeout(() => {
                self.onResolveCallBack.forEach(callback => {
                    callback(value)
                })
            })
        }
    }
    function reject(reason) {
        if (self.status === 'pending') {
            self.status = 'rejected';
            self.reason = reason;
            setTimeout(() => {
                self.onResolveCallBack.forEach(callback => {
                    callback(reason)
                })
            })
        }
    }
    try {
        executor(resolve.bind(this), reject.bind(this))
    } catch (e) {
        reject(e)
    }

}

MyPromise.prototype.then = function (onResolved, onRejected) {
    let self = this;
    let promise2;
    onResolved = typeof onResolved === 'function' ? onResolved: (v)=> v;
    onRejected = typeof onRejected === 'function' ? onRejected: (r) => { throw r };

    if (self.status === 'resolved') {
        return promise2 = new Promise((resolve,reject) => {
            try {
                let x = onResolved(self.data);
                if (x instanceof Promise) {
                    x.then(resolve, reject)
                }
                resolve(x) //
            } catch (e) {
                reject(e) //
            }
        })
    }
    if (self.status === 'rejected') {
        return promise2 = new Promise((resolve,reject) => {
            try {
                let x = onRejected(self.data);
                if (x instanceof Promise) {
                    x.then(resolve, reject)
                }
            } catch (e) {
                reject(e)
            }
        })
    }
    if (self.status === 'pending') {
        return promise2 = new Promise((resolve,reject) => {
           self.onResolveCallBack.push(function () {
               try {
                  let x = onResolved(self.data);
                   if(x instanceof Promise) {
                       x.then(resolve,reject)
                   }
               } catch(e) {
                  reject(e)
               }
           });
           self.onRejectCallback.push(function () {
               try {
                   let x = onRejected(self.reason);
                   if(x instanceof Promise) {
                       x.then(resolve, reject)
                   }
               } catch (e) {
                   reject(e)
               }
           })
        })
    }
};
MyPromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
};