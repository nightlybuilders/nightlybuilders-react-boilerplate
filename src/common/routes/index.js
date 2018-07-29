import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { StaticRouter } from 'react-router'
import { renderRoutes } from 'react-router-config'

import { AppContainer } from '../../client/components/app'
import { apiClient } from '../api/client'

const Example = () => <span>Hello Example Page</span>
const NotFound = () => <span>404 - Nothing here</span>

/**
 * inspired by (Credits):
 * - loadData solution and renderRoutes: https://alligator.io/react/react-router-ssr/
 *
 * Attention: because we use renderRoute, 'render' is not available in the Routes
 * configuration!
 */
export const Routes = [
  {
    exact: true,
    path: '/',
    component: AppContainer,
    loadData: () => apiClient('posts'),
  },
  {
    path: '/example',
    component: Example,
  },
  {
    component: NotFound,
  },
]

const AppRoutes = () => renderRoutes(Routes)
AppRoutes.displayName = 'AppRoutes'

/* eslint-disable-next-line react/prop-types */
export const ClientRouter = ({ history }) => (
  <ConnectedRouter history={history}>
    <AppRoutes />
  </ConnectedRouter>
)
ClientRouter.displayName = 'ClientRouter'

/* eslint-disable-next-line react/prop-types */
export const ServerRouter = ({ req, context }) => (
  <StaticRouter location={req.url} context={context}>
    <AppRoutes />
  </StaticRouter>
)
ServerRouter.displayName = 'ServerRouter'
