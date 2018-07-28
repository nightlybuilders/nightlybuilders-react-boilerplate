// Store
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers'

// Redux Store
export const createReduxStore = preloadedState =>
  createStore(reducers, preloadedState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
