import React,{ Component } from 'react';
// 非受控组件
export default class NoControlInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: ''
        }
    }
    handleChange =(e) => {
        let val = this.refs.a.value;
        this.setState({val})
    };
    render() {
        return (
            <div>
                <input type="text" onChange={this.handleChange} ref = 'a'/>
                <h2>{this.state.val}</h2>
            </div>
        )
    }
}