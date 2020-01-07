import React from 'react'
import ReactDOM from 'react-dom'
class Clock extends React.Component { // 类组件拥有自己的状态 函数组件没有
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }
    // 组件挂在完成（react虚拟dom转成真实dom之后执行此方法）
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(),1000);
    }
    // 当React准备销毁一个组件是，先调用此防范，进行一些资源的释放和清理工作
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    // 类组件的渲染过程

    tick=() => {
        // 修改本地状态必须使用setSate，以为用了此方法后react会调用render方法，根据最新的状态重新渲染。
        this.setState({
            date: new Date()
        });
    };
    render() {
        return(
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
            )
    }
}
ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);