import React, { Component } from 'react'
import AntdTest from "./components/ant";
import HomePage from './react-content'

export default class CartSample extends Component {
    constructor(props) {
        super(props);
        this.state = {  // 不要直接修改state 使用setState
            goods: [
                { id: 0, text: 'good1' },
                { id: 1, text: 'good2' }
            ],
            text: '',
            cart: []
        }
    };
    textChange = (e) => {
        this.setState({
            text: e.target.value
        })
    };
    addGood = () => {
        this.setState(prevState => { // state 可能是异步的，需要用上一个state作为参数
            if (prevState.text !== '') {
                return {
                    goods: [
                        ...prevState.goods,
                        {
                            id: prevState.goods.length + 1,
                            text: prevState.text
                        }
                    ]
                }
            }
        })
    };
    addToCart = good => {
       const newCart = [...this.state.cart];
       const idx = newCart.findIndex(c => c.id === good.id);
       const item = newCart[idx];
       if(item) {
          newCart.splice(idx, 1, {...item, count: item.count + 1})
       } else {
          newCart.push({...good,count:1});  
       }
       this.setState({cart: newCart});
    }; // 为了在回调中使用`this`, 可以使用箭头函数定义func 或者 constructor 中 bind这个方法
    add = good => {
        const newCart = [...this.state.cart];
        const idx = newCart.findIndex(c => c.id === good.id);
        const item = newCart[idx]
        newCart.splice(idx, 1, { ...item, count: item.count + 1 })
        this.setState({ cart: newCart });
    };
    minus = good => {
        const newCart = [...this.state.cart];
        const idx = newCart.findIndex(c => c.id === good.id);
        const item = newCart[idx]
        newCart.splice(idx, 1, { ...item, count: item.count -1 })
        this.setState({ cart: newCart });  
    };
    componentDidMount() { // 方法会在组件已经被渲染到 DOM 中后运行

    }
    componentWillUnmount() {

    }
    render() {
        return (
            <div>
                {/*/!*{条件渲染}*!/*/}
                {/*{this.props.title && <h1>{this.props.title}</h1>}*/}
                {/*/!*{列表渲染}*!/*/}
                {/*<div>*/}
                {/*    <input type="text" value={this.state.text} onChange={this.textChange} />*/}
                {/*    <ul>*/}
                {/*        {this.state.goods &&*/}
                {/*         this.state.goods.map(good => */}
                {/*            (<li key={good.id}>{good.text}*/}
                {/*         <button onClick={() => this.addToCart(good)}>加购</button>*/}
                {/*         </li>))}*/}
                {/*    </ul>*/}
                {/*    <button onClick={this.addGood}>add Good</button>*/}
                {/*</div>*/}
                {/*<Cart data={this.state.cart} minus={this.minus} add={this.add}></Cart>*/}
                {/* antd */}
                <AntdTest></AntdTest>
                <HomePage></HomePage>
            </div>
        )
    }
}
//
// function Cart({data, minus, add}) {
//     return (
//         <table>
//             <tbody>
//                 {data.map(d => (
//                     <tr key={d.id}>
//                         <td>{d.text}</td>
//                         <td>
//                             <button onClick={() => add(d)}>+</button>
//                         </td>
//                         <td>{d.count}</td>
//                         <td>
//                             <button onClick={() => minus(d)}>-</button>
//                         </td>
//                         {/* <td>{d.price*d.count}</td> */}
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// }