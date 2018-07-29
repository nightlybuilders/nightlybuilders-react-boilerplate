import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

import { ServerRouter } from '../common/routes'
import { createReduxStore } from '../common/createStore'
import { renderFullPage } from './render-full-page'

import pkg from '../../package.json'

require('dotenv').config()

const ts = new Date().getTime() // ts at start time

export const handleRender = req => {
  // cachebuster and redux store
  const currentVersion = process.env.VERSION || ts || pkg.version
  const { store } = createReduxStore(req.url)
  const context = {}

  // NOTE:
  // one could dispatch an action here now (eg. for instance prepare a state, based
  // on the cookies of the user or something else), before renderToString.
  // Example: https://github.com/cereallarceny/cra-ssr/blob/master/server/loader.js#L59-L65
  const html = renderToString(
    <Provider store={store}>
      <ServerRouter req={req} context={context} />
    </Provider>,
  )

  // Grab the initial state from our Redux store
  // https://redux.js.org/recipes/server-rendering#inject-initial-component-html-and-state
  const preloadedState = store.getState()

  // Send the rendered page back to the client
  return renderFullPage({ html, preloadedState, currentVersion })
}
