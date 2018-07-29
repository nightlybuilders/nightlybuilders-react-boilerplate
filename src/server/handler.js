import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { matchRoutes } from 'react-router-config'
import merge from 'lodash.merge'

import { Routes, ServerRouter } from '../common/routes'
import { createReduxStore } from '../common/createStore'
import { renderFullPage } from './render-full-page'

import pkg from '../../package.json'

require('dotenv').config()

const ts = new Date().getTime() // ts at start time

export const handleRender = async (req, res) => {
  // cachebuster and redux store
  const currentVersion = process.env.VERSION || ts || pkg.version

  // Prefetch data based on the current react-router route
  // - https://reacttraining.com/react-router/web/guides/server-rendering/data-loading
  // - https://alligator.io/react/react-router-ssr/
  const matchingRoutes = matchRoutes(Routes, req.path)
  const promises = []
  matchingRoutes.forEach(route => {
    if (route.route.loadData) {
      promises.push(route.route.loadData())
    }
  })

  // TODO: create promise-all-never-fails utility (because of one request fails,
  // all others would fail/be cancelled as well)
  let preloadedData = {}
  const result = await Promise.all(promises)
  result.forEach(data => {
    preloadedData = merge({}, preloadedData, data)
  })
  const context = { ...preloadedData }

  // TODO: add prefetched data also (or only) in Redux, because currently
  // Child components would render the data in the client only (as soon as they
  // have access to the window.__PRELOADED_DATA__ object)
  const { store } = createReduxStore(req.url)
  // Grab the initial state from our Redux store
  // https://redux.js.org/recipes/server-rendering#inject-initial-component-html-and-state
  const preloadedState = store.getState()

  // NOTE:
  // one could dispatch an action here now (eg. for instance prepare a state, based
  // on the cookies of the user or something else), before renderToString.
  // Example: https://github.com/cereallarceny/cra-ssr/blob/master/server/loader.js#L59-L65
  const html = renderToString(
    <Provider store={store}>
      <ServerRouter req={req} context={context} />
    </Provider>,
  )

  // redirect based on the status or when context.url is set (eg. <Redirect />
  // component is used)
  // Docs:
  // - https://reacttraining.com/react-router/web/guides/server-rendering/adding-app-specific-context-information
  // - https://alligator.io/react/react-router-ssr/
  if (context.status === 404) {
    res.status(404)
  }
  if (context.url) {
    return res.redirect(301, context.url)
  }

  // Send the rendered page back to the client
  return renderFullPage({ currentVersion, html, preloadedState, preloadedData })
}
