import React,{Component} from 'react'

export default class StateTest extends Component {
   state = {
       counter: 1
   };
    componentDidMount() {  // State 的更新会被合并
      // this.setState({counter: this.state.counter + 1})
      // this.setState({counter: this.state.counter + 1})
      // this.setState({counter: this.state.counter + 1})
      this.setState(preState => ({
         counter: preState.counter + 1
      }));
      this.setState(preState =>({
          counter: preState.counter + 1
      }))
   }
    render() {
        return <div>{this.state.counter}</div>;
    }
}
