/* eslint-disable no-underscore-dangle */
/**
 * DOCS
 * - read more about REDUX SSR integration here:
 *   - https://redux.js.org/recipes/server-rendering
 * - read more about REACT ROUTER SSR integration here:
 *   - https://reacttraining.com/react-router/web/guides/server-rendering/putting-it-all-together
 *   - recommended: https://medium.com/@cereallarceny/server-side-rendering-in-create-react-app-with-all-the-goodies-without-ejecting-4c889d7db25e
 *
 * inspired by (Credits)
 * - https://github.com/cereallarceny/cra-ssr/blob/master/server/loader.js
 */
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory, createMemoryHistory } from 'history'
import thunkMiddleware from 'redux-thunk'
import historyMiddleware from './middleware/history'

import rootReducer from './reducers'
import { isServer } from '../common/utils/is-server'

export const createReduxStore = (url = '/') => {
  // create a history depending on the environment
  const history = isServer
    ? createMemoryHistory({
        initialEntries: [url],
      })
    : createBrowserHistory()

  // add dev tools to the enhancers when available
  const enhancers = []
  if (process.env.NODE_ENV === 'development' && !isServer) {
    const { devToolsExtension } = window
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // prepare the middlewares
  const middleware = [thunkMiddleware, routerMiddleware(history), historyMiddleware]
  const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)

  // grab the state from a global variable injected into the server-generated HTML
  const initialState = !isServer ? window.__PRELOADED_STATE__ : {}
  // allow the passed state to be garbage-collected
  if (!isServer) {
    delete window.__PRELOADED_STATE__
  }

  // and finally create the store
  const store = createStore(connectRouter(history)(rootReducer), initialState, composedEnhancers)

  return {
    store,
    history,
  }
}
