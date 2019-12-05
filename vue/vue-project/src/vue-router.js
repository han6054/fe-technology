let Vue;
class Router {
    constructor () {
        this.a = 1
    }
}
Router.install = (_Vue) => {
    console.log(_Vue)
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() {
            if(this.$options && this.$options.router) {
                this._router = this.$options.router
            } else {
                this._router = this.$parent && this.$parent.router
            }
        }
    })
};

export default  Router