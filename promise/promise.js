
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

MyPromise.prototype.then = function (onResolved, onReject) {
    let self = this;
    let promise2;
    onResolved = typeof onResolved === 'function' ? onResolved: (v)=> v;
    onReject = typeof onReject === 'function' ? onReject: (r) => { throw r };

    if (self.status === 'resolved') {
        self.onResolveCallBack.push(onResolved)
    }
}