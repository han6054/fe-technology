//  支持vue.use

let Vue;
class Store {
    constructor (options = {}) {
        // 响应式
        this.state = new Vue({
            data: options.state
        });
        this.mutations = options.mutations || {};
        this.actions = options.actions || {};
    }
    // commit 修改mutation
    commit = (type, arg) => {
        if (!this.mutations[type]) return;
        this.mutations[type](this.state, arg)
    };
    dispatch(type, arg) {
        this.actions[type]({
            commit: this.commit,
            state: this.state
        },arg)
    }
}
function install(_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() {
            if(this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

export default {
    Store,
    install
}
