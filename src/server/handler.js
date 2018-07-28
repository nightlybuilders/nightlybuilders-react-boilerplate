import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createReduxStore } from '../common/createStore'

import { AppContainer } from '../client/components/app'
import { renderFullPage } from './render-full-page'

import pkg from '../../package.json'

require('dotenv').config()

const ts = new Date().getTime() // ts at start time

// DOCS
// - read more about REDUX SSR integration here:
//   https://redux.js.org/recipes/server-rendering
export const handleRender = () => {
  // cachebuster and redux store
  const currentVersion = process.env.VERSION || ts || pkg.version
  const store = createReduxStore()

  const html = renderToString(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
  )

  // Grab the initial state from our Redux store
  // https://redux.js.org/recipes/server-rendering#inject-initial-component-html-and-state
  const preloadedState = store.getState()

  // Send the rendered page back to the client
  return renderFullPage({ html, preloadedState, currentVersion })
}
