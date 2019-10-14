import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import indexReducer from './index'

//合并项目组件中store的reducer
const reducer = combineReducers({
    index: indexReducer
})
