
// react 上下文处理多层组件传递问题

import React,{ Component } from 'react';
import PropTypes from 'prop-types'
class Title extends Component {
    static contextTypes = {
      color: PropTypes.string,
      setColor: PropTypes.func
    };
    render() {
        return(
            <div>
                <h1 style={{color: this.context.color}}>i'm title </h1>
                <button onClick={() =>this.context.setColor('green')}>green</button>
                <button onClick={() =>this.context.setColor('yellow')}>yellow</button>
            </div>
        )
    }
}

class Content extends Component {
    static contextTypes = {
        color: PropTypes.string
    };
    render() {
        return (
            <div style={{color: this.context.color}}>i'm content </div>
        )
    }
}

class Header extends Component {
    render() {
        return (
            <div>
                <Title/>
            </div>
        )
    }
}

class Main extends Component {
    render() {
        return (
            <div>
                <Content/>
            </div>
        )
    }
}

// 1 父组件定义 childContextTypes 子上下文类型
// 2.父组件定义getChildContext 用来返回上下文对象
// 3.在要接受这些上下文对象的组件里定义contextTypes
export default class HomePage extends Component {
    static childContextTypes = {
        color: PropTypes.string,
        setColor: PropTypes.func
    };
    getChildContext() {
        return {
            color: this.state.color,
            setColor: this.setColor
        }
    }
    setColor = (color) => {
        this.setState({color});
    };
    constructor() {
        super();
        this.state = {color: 'red'};
    }
    render() {
        return (
            <div>
                <Header/>
                <Main/>
            </div>
        )
    }
}