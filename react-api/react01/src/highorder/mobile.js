import React, {Component} from 'react'
import local from './local'

class Mobile extends Component {
    render() {
        console.log(this.props)
        return <label>电话号： <input defaultValue={this.props.data} onChange={this.props.handleChange}/><br/></label>
    }
}
export default local(Mobile, 'mobile', 'phone')