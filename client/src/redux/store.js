
import appReducer from './reducers'
import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
export default createStore(appReducer,composeWithDevTools(applyMiddleware(thunk)))