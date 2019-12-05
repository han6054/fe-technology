let Vue;
class Router {
    constructor ({routes, mode}) {
        this.routeMap = {}; // 路由表
        this.mode = mode;
        routes.map(route => {
            this.routeMap[route.path] = route.component
        });
        // 定义响应式数据
        Vue.util.defineReactive(this, 'route', {current: '/'});
        // console.log(routeMap);
        if(mode === 'hash') {
            window.addEventListener('load', ()=> {
                location.hash ? '': location.hash = '/'
            });
            window.addEventListener('hashchange', ()=> {
                this.route.current = location.hash.slice(1)
            });
        } else {
            location.pathname?'':location.pathname = '/';
            window.addEventListener('load',()=>{
                this.route.current = location.pathname;
            });
            window.addEventListener('popstate',()=>{
                this.route.current = location.pathname;
            })

        }
    }
}
Router.install = (_Vue) => { // Vue中调用use方法，会调用该插件的install方法
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() { // 因为每个组件都有router 在mixin处理
            if(this.$options && this.$options.router) {
                this._router = this.$options.router
            } else {
                // vue组件的渲染顺序  父 -> 子 -> 孙子 当前组件如果没有传入router向父级查找
                this._router = this.$parent && this.$parent._router //
            }
            // 每个组件 $route, $router
            Object.defineProperty(this, '$route', {
                value: {}
            });
            Object.defineProperty(this, '$router', {
                value: {}
            });
        }
    });
    // router-link router-view
    Vue.component('router-link', {
        props: {
            to: String,
            tag: String
        },
        render() {
            return <a href={this.mode === 'hash'?`#${this.to}`:this.to}>{this.$slots.default}</a>
        }
    });
    Vue.component('router-view', {
        render(h) {
            return h(this._router.routeMap[this._router.route.current])
        }
    })
};

export default  Router