import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App'
import {HashRouter as Router, Route} from 'react-router-dom'


let Home = () => <div>首页</div>
ReactDOM.render(
  <Router>
      <Route path="/home" component={Home}></Route>
  </Router>,
  document.getElementById('root')
);
