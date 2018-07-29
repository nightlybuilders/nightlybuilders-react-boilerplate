/**
 * inspired by (Credits)
 * - https://github.com/cereallarceny/cra-ssr/blob/master/src/index.js
 */
import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'

// store and routes
import { createReduxStore } from '../common/createStore'
import { ClientRouter } from '../common/routes'

// Create a store and get back the store itself and its history
const { store, history } = createReduxStore()

const App = (
  <Provider store={store}>
    <ClientRouter history={history} />
  </Provider>
)

hydrate(App, document.getElementById('_app'))
