import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch, StaticRouter } from 'react-router'

import { AppContainer } from '../../client/components/app'

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={AppContainer} />
    <Route exact path="/example" render={() => <span>Hello Example Page</span>} />
    <Route render={() => <span>404 - Nothing here</span>} />
  </Switch>
)
Routes.displayName = 'Routes'

/* eslint-disable-next-line react/prop-types */
export const ClientRouter = ({ history }) => (
  <ConnectedRouter history={history}>
    <Routes />
  </ConnectedRouter>
)
ClientRouter.displayName = 'ClientRouter'

/* eslint-disable-next-line react/prop-types */
export const ServerRouter = ({ req, context }) => (
  <StaticRouter location={req.url} context={context}>
    <Routes />
  </StaticRouter>
)
ServerRouter.displayName = 'ServerRouter'
