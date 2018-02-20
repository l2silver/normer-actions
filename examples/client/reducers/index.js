
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import normer from './todos'

export default combineReducers({
  routing,
  normer,
})
