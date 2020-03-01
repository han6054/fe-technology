// react 父子传值

import React from 'react'
import ReactDOM from 'react-dom'
import propsTypes from 'prop-types';
export default class Person extends React.Component {
    // 类型校验
    static propsTypes = {
        name: propsTypes.string.isRequired,
        age: propsTypes.number.isRequired,
        gender: propsTypes.oneOf(['男', '女']),
        hobby: propsTypes.array
};
    constructor(props) {
        super(props);
    }
    render() {
        let {name, age, gender, hobby} = this.props;
        return (
            <table>
                <thead>
                  <th>
                      <td>姓名</td>
                      <td>年龄</td>
                      <td>性别</td>
                      <td>爱好</td>
                  </th>
                </thead>
                <tbody>
                <tr>
                    <td>{name}</td>
                    <td>{age}</td>
                    <td>{gender}</td>
                    <td>{hobby}</td>
                </tr>
                </tbody>
            </table>
        )
    }
}
let p =  {
    name: 'j',
    age: 10,
    gender: '男',
    hobby: ['ssds']
};
ReactDOM.render(<Person {...p}/>, document.querySelector('#root'));