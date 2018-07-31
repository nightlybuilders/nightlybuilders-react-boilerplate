/**
 * General Docs
 * - Example, how to use prefetched data outside of redux: https://gist.github.com/natterstefan/ff1314d5258727c4f52915bc31c80b6a
 * - SSR Support for react-router 4: https://alligator.io/react/react-router-ssr/
 * - React Router, Prefetch data based on the current route: https://reacttraining.com/react-router/web/guides/server-rendering/data-loading
 * - Redux, Inject state SSR: https://redux.js.org/recipes/server-rendering#inject-initial-component-html-and-state
 *
 */
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { matchRoutes } from 'react-router-config'
import merge from 'lodash.merge'

import { Routes, ServerRouter } from '../common/routes'
import { createReduxStore } from '../common/createStore'
import { renderFullPage } from './render-full-page'

import { changeCachebuster } from '../common/actions/app'

require('dotenv').config()

const ts = new Date().getTime() // ts at start time

export const handleRender = async (req, res) => {
  // cachebuster
  const currentVersion = process.env.VERSION || ts

  // prepare the arrays for
  // - loadData: preload the data for each matching route defined in ../common/routes
  // - dispatchData: prepare the store for each matching route
  const matchingRoutes = matchRoutes(Routes, req.path)
  const loadDataRequests = []
  const dispatchDataRequests = []
  matchingRoutes.forEach(route => {
    if (route.route.loadData) {
      loadDataRequests.push(route.route.loadData())
    }
    if (route.route.dispatchData) {
      dispatchDataRequests.push(route.route.dispatchData)
    }
  })

  // TODO: create promise-all-never-fails utility (because of one request fails,
  // all others would fail/be cancelled as well)
  let preloadedData = {}
  const result = await Promise.all(loadDataRequests)
  result.forEach(data => {
    preloadedData = merge({}, preloadedData, data)
  })

  // this context is then later accessible in the route component (eg. <App />)
  const context = { ...preloadedData }

  const { store } = createReduxStore(req.url)
  // demonstration of how the store could be manipulated/prepared already on the server
  // eg. based on data which is stored in the cookie
  store.dispatch(changeCachebuster(currentVersion))

  // the currently prefetched data (defined in loadData on the route), will be
  // passed along the current store to the route (which can prepare the redux
  // store)
  dispatchDataRequests.forEach(dispatchData => {
    dispatchData(store, preloadedData)
  })

  // Grab the current state from our Redux store to render it in the html
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
