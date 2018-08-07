/**
 * inspired by (Credits)
 * - https://github.com/cereallarceny/cra-ssr/blob/master/src/index.js
 */
import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'

// services, store and routes
import { services } from '../common/services'
import { createReduxStore } from '../common/createStore'
import { ClientRouter } from '../common/routes'
import { getApolloClient } from '../common/api/apollo'
import { ApiClient } from '../common/api/client'

// Create a store and get back the store itself and its history
const { store, history } = createReduxStore()

// And install the api services
services.set('api', new ApiClient(window.__GLOBALS__.apiUrl)) // eslint-disable-line no-underscore-dangle

const App = (
  // eslint-disable-next-line no-underscore-dangle
  <ApolloProvider client={getApolloClient(window.__GLOBALS__.gqlUrl)}>
    <Provider store={store}>
      <ClientRouter history={history} />
    </Provider>
  </ApolloProvider>
)

hydrate(App, document.getElementById('_app'))
