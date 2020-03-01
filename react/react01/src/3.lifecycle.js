import React from "react";


class subCounter extends React.Component {
    // 当子组件将要接收的父组件传给他的新属性的时候
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('subCounter: componentWillReceiveProps');
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('subCounter: shouldComponentUpdate');
        if (nextProps.count <= 5) {// 子组件数量大于5不更新视图
            return true
        } else {
            return  false
        }
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('subCounter: componentWillUpdate');
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('subCounter: componentDidUpdate');
    }
    // 更新逻辑
    // componentWillReceiveProps => shouldComponentUpdate => componentWillUpdate => render => componentDidUpdate

    render() {
        return(<div>
            子计数：{this.props.count}
</div>)
}
}

export default class Counter extends React.Component  {
    // 默认属性对象
    static defaultProps = {
        count: 0
    };
    constructor(props) {
        console.log('constructor');
        super(props);
        this.state = {count: props.count}
    }
    componentWillMount() {
        console.log('1.componentWillMount 组件将要挂载');
    }
    handleClick = () => {
      this.setState(prevState=> ({
          count: prevState.count + 1
      }),()=> {

      });
    };
    componentWillUnmount() { // 组件销毁
        console.log('componentWillUnmount');
    }
    destroy = () => {
        ReactDOM.unmountComponentAtNode(document.querySelector('#root'));
    };
    // 询问组件是否需要更新，当一个组件的属性或者状态发生了改变，默认就要重新渲染
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextState.count < 10 ) { // 如果count 大于10 就不更新视图
            return true
        } else {
            return false
        }
    }

    // 更新逻辑
    // shouldComponentUpdate => componentWillUpdate => render => componentDidUpdate

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('componentWillUpdate, 组件将要更新')
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate', '组件更新完毕')
    }
    render() {
        console.log('2.render 挂载=》react把虚拟dom转成真实dom');
        return(<div>
            父计数器： {this.state.count}
            <button onClick={this.handleClick}>+</button>
            <button onClick={this.destroy}>kill</button>
            <subCounter count={this.state.count}></subCounter>
        </div>)
   }
   // 组件挂载完成
   componentDidMount() {
        console.log('3.componentDidMount 组件挂载完成')
   }
}
