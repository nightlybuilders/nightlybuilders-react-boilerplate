/**
 * inspired by (Credits)
 * - https://github.com/adamsoffer/next-apollo/blob/d555f0b61d5108e58c7f814d4c37f9fc642e3ba0/src/initApollo.js
 */
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

import dbg from 'debug'
import 'cross-fetch/polyfill' // solves: https://stackoverflow.com/q/50688998/1238150
import { isServer } from '../utils/is-server'

const debug = dbg('nb:apollo')
let apolloClient = null

const createApollo = uri => {
  const initialState =
    typeof window !== 'undefined'
      ? window.__APOLLO_STATE__ // eslint-disable-line
      : undefined

  const config = {
    cache: new InMemoryCache().restore(initialState || {}),
    connectToDevTools: !isServer,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.map(({ message, locations, path }) =>
            debug(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
          )
        if (networkError) debug(`[Network error]: ${networkError}`)
      }),
      new HttpLink({
        uri,
        opts: {
          credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        },
      }),
    ]),
    ssrMode: isServer, // Disables forceFetch on the server (so queries are only run once)
    ssrForceFetchDelay: 100,
  }

  return new ApolloClient(config)
}

export const getApolloClient = uri => {
  if (!uri) {
    debug('uri is not defined!')
    return null
  }

  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (isServer) {
    return createApollo(uri)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApollo(uri)
  }

  return apolloClient
}
