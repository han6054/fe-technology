import React from 'react'
import ReactDOM from 'react-dom'

class Counter extends React.Component {
    constructor(props){
        super(props);
        this.state = {counter: 0}
    }
    click = () => {
       this.setState({counter: this.state.counter + this.props.increment});
       // => setState可能是异步的，另外多个setState有可能合并
       this.setState((prevState, props) => ({counter: prevState.counter + props.increment})); // 异步处理
       // =>
    };
    render() {
        return(<div>
            <h1>{this.state.counter}</h1>
            <button onClick={this.click}>+</button>
        </div>)
    }
}

ReactDOM.render(<Counter increment={1}/>, document.getElementById('root'));