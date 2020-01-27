//  高阶组件  是一个普通的函数 传入一个组件， 返回一个新的组件

import React, {Component} from 'react'
import UserName from './userName'
import Mobile from './mobile'


export default class Memo extends Component {
    render() {
        return(
            <form>
                <UserName></UserName>
                <Mobile></Mobile>
                留言 :  <textarea></textarea>
            </form>
        )
    }
}