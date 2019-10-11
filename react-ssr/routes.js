import React from 'react'
import {Route, Link} from 'react-router-dom'
import Index from './container/index'
import Login from './container/login'

export default (
    <div>
        <div>
            <Link to='/'>首页</Link> || <Link to='/login'>登录</Link>
        </div>
        <div>
            <Route path='/' exact component={Index} ></Route>
            <Route path='/login' exact component={Login}></Route>
        </div>
    </div>
)