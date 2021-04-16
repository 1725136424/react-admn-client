import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers/index'
// 整合redux异步模块
import thunk from 'redux-thunk'
// 整合redux开发者工具
import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))
