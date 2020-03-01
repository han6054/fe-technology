import React,{Component} from 'react'
import store from '../store'
import * as types from '../reducers/action-types'
export default class Counter extends Component {
    constructor(){
        super();
        this.state = {number: store.getState().counter.number};
    }
    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({number: store.getState().counter.number})
        })
    }
    componentWillUnmount() {
        this.unsubscribe()
    }
    render() {
        console.log(this.state.number)
        return(
            <div>
                <p>{this.state.number}</p>
                <button onClick={() => store.dispatch({type: types.INCREMENT})}> + </button>
                <button onClick={() => store.dispatch({type: types.DECREMENT})}> - </button>
                <button onClick={() => {
                    setTimeout(() => {
                        store.dispatch({type: types.INCREMENT})  
                    },1000)
                }}> 过一秒 加</button>
            </div>
        )
    }
}