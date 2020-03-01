import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import {HashRouter as Router, Route} from 'react-router-dom'
//  redux test                                                                                                                                                                                                                                                 
import Counter from './components/Counter'
import Todos from './components/Todos'


// let Home = () => <div>首页</div>
ReactDOM.render(
  <App/>,
  // <Router>
  //     <Route path="/home" component={Home}></Route>
  // </Router>,
  document.getElementById('root')
);

// ReactDOM.render((
//   <div>
//     <Counter/>
//     <Todos/>
//   </div>
// ),document.getElementById('root'))