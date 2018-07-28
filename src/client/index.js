/* eslint-disable no-underscore-dangle */
import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { createReduxStore } from '../common/createStore'

// Components
import { AppContainer } from './components/app'

// REDUX
// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__
const store = createReduxStore(preloadedState)

hydrate(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('_app'),
)
