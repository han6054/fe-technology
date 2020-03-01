
import React, {Component} from 'react'
import local from './local'

class UserName extends Component {
    render() {
        return <label>用户名： <input defaultValue={this.props.data} onChange={this.props.handleChange}/><br/></label>
    }
}
export default local(UserName, 'username', '用户名')