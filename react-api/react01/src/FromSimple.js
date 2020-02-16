import React,{ Component } from 'react';

export default class FromSimple extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }
    handleUserName = (e) => {
        this.setState({
            username : e.target.value
        })
    };
    handlePassword = (e) => {
        this.setState({
            password : e.target.value
        })
    };
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.username && this.state.password) {
          alert(`当前用户名：${this.state.username},密码：${this.state.password}`)
        }
    };
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <p className="username">
                        <label htmlFor="name">用户名:</label>
                        <input type="text" value={this.state.username} onChange={this.handleUserName} id="name"/>
                    </p>
                    <p className="username">
                        <label htmlFor="name">密码:</label>
                        <input type="text" value={this.state.password} onChange={this.handlePassword} id="pwd"/>
                    </p>
                    <br/>
                    <p>
                       爱好:
                        <select>
                            <option value="smoking">抽烟</option>
                            <option value="drink">喝酒</option>
                        </select>
                    </p>
                    <input type="submit" value="登录"/>
                </form>
            </div>
        )
    }
}