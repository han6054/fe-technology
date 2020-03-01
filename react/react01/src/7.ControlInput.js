import React,{ Component } from 'react';

// 受控组件，受状态控制的组件

    export default class ControlInput extends Component {
        constructor(props) {
            super(props);
            this.state = {
                val : '',
                data: []
            }
        }
        handleChange = (e) => {
            let val = e.target.value;
            this.setState({
                val
            })
        };
        handleClick = () => {
            if(this.state.val) {
                let newArr = [...this.state.data];
                newArr.push(this.state.val);
                this.setState({
                    data: newArr
                });
                this.setState({
                    val: ''
                })
            }
        };
        render() {
            return(
                <div>
                    <input type="text" value={this.state.val} onChange={this.handleChange}/>
                    <button onClick={this.handleClick}>添加数据</button>
                    <ul>
                        {
                            this.state.data && this.state.data.map((item,i) => {
                                return (
                                    <li key={i}>{item}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            )
        }
    }
