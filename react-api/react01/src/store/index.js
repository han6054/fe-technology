import {createStore} from 'redux'
import reducers from '../reducers'
let store = createStore(reducers);
window.store = store; // 方便控制台调试
export default store
