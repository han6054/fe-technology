//  高阶组件就是一个函数， 用来封装重复的逻辑
// 传进一个老组件返回一个新组件

import React, {Component} from 'react'

export default function (OldComponent, name, placeholder) {
    class NewComponent extends Component {
        constructor() {
            super();
            this.state = {data: ''}
        }
        componentWillMount() {
            this.setState({data: localStorage.getItem(name) || placeholder})
        }
        handleChange = (event) => {
            localStorage.setItem(name, event.target.value)
        };
        render() {
            return <OldComponent data={this.state.data} handleChange={this.handleChange}/>
        }
    }
    return NewComponent;
}