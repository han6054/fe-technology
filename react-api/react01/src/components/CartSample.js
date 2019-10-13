import React,{Component} from 'react'

export default class CartSample extends Component {
    constructor(props) {
        super(props);
        this.state = {
           goods: [
               {id:0, text: 'good1'},
               {id:1, text: 'good2'}
           ],
           text: ''
        }
    };
    textChange = () => {
        this.setState({
           text: this.state.text
        })
    };
    render(){
        return(
            <div>
                {/*{条件渲染}*/}
                {this.props.title && <h1>{this.props.title}</h1>}
                {/*{列表渲染}*/}
                <div>
                    <input type="text" value={this.state.text} onChange={this.textChange}/>
                    <ul>
                        {this.state.goods &&
                        this.state.goods.map(good => (<li key={good.id}>{good.text}</li>))}
                    </ul>
                </div>
            </div>
        )
    }
}