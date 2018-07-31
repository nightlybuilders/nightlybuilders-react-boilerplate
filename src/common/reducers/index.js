import { combineReducers } from 'redux'
import { reducer as app } from './app'
import { reducer as posts } from './posts'

export default combineReducers({
  app,
  posts,
})
