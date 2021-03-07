import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './user'
import mugReducer from './mug'
import singleMugReducer from './singleMug'
import cartReducer from './cart'
import allUsersReducer from './users'

const reducer = combineReducers({
  user: userReducer,
  users: allUsersReducer,
  mugs: mugReducer,
  mug: singleMugReducer,
  cart: cartReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './mug'
export * from './cart'
