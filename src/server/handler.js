/**
 * General Docs
 * - Example, how to use prefetched data outside of redux: https://gist.github.com/natterstefan/ff1314d5258727c4f52915bc31c80b6a
 * - SSR Support for react-router 4: https://alligator.io/react/react-router-ssr/
 * - React Router, Prefetch data based on the current route: https://reacttraining.com/react-router/web/guides/server-rendering/data-loading
 * - Redux, Inject state SSR: https://redux.js.org/recipes/server-rendering#inject-initial-component-html-and-state
 *
 */
import React from 'react'
import get from 'lodash.get'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { matchRoutes } from 'react-router-config'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { Helmet } from 'react-helmet'

import { Routes, ServerRouter } from '../common/routes'
import { createReduxStore } from '../common/createStore'
import { getApolloClient } from '../common/api/apollo'
import { services } from '../common/services'
import { ApiClient } from '../common/api/client'
import { changeCachebuster } from '../common/actions/app'
import { promiseAll } from '../common/utils/promise-all'

import { renderFullPage } from './render-full-page'

require('dotenv').config()

const ts = new Date().getTime() // ts at start time

export const handleRender = async (req, res) => {
  // set (install) a common services, which can be later used in eg. the <App />
  services.set('api', new ApiClient(process.env.API_HOSTS))

  // prepare some globals, like eg. cachebuster
  const currentVersion = process.env.VERSION || ts

  // NOTE:
  // demonstration of how the store could be manipulated/prepared already on the server
  // eg. based on data which is stored in the cookie
  // Example: https://github.com/cereallarceny/cra-ssr/blob/master/server/loader.js#L59-L65
  const { store } = createReduxStore(req.url)
  store.dispatch(changeCachebuster(currentVersion))

  // A container can contain a loadData property, which is used to prefetch data
  // if the route matches and the container is rendered
  const matchingRoutes = matchRoutes(Routes, req.path)
  const loadDataRequests = []
  matchingRoutes.forEach(route => {
    const loadData = get(route, 'route.component.loadData', () =>
      Promise.resolve(),
    )
    const location = get(route, 'match') || {}
    loadDataRequests.push(loadData(store, location))
  })
  await promiseAll(loadDataRequests)

  // this context is then later accessible in the route component (eg. <App />)
  const context = {}

  // Grab the current state from our Redux store to render it in the html
  const preloadedState = store.getState()

  const client = getApolloClient(process.env.GQL_HOSTS)
  const App = (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ServerRouter req={req} context={context} />
      </Provider>
    </ApolloProvider>
  )

  await getDataFromTree(App)
  const html = renderToString(App)
  const preloadedApollo = client.extract()

  // Because the component keeps track of mounted instances, you have to make
  // sure to call renderStatic on server, or you'll get a memory leak.
  const helmet = Helmet.renderStatic()

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
  return renderFullPage({
    currentVersion,
    helmet,
    html,
    preloadedApollo,
    preloadedState,
  })
}
