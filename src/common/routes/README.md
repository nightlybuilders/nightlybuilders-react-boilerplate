# Routes

We use [connected-react-router@4][1] and [react-router@4][2] as well
as [react-router-config@1(beta)][3] to allow proper navigating and routing in
the React App (both on the server and client). On the server we use [StaticRouter][4]
and [ConnectedRouter][5] on the client. This allows us do dispatch route change
actions and keep the current history details in the redux store, for instance.

## Route Setup

Before starting adding new routes, you could take a look at the following articles
to understand how react-router-config works and how we use matchRoutes for instance
to preload data for a matching route.

* [React-Router-SSR Setup][6] with preloading Data using [matchRoutes][7] by Alligator.io
* [Server Rendering, Code Splitting, and Lazy Loading with React Router v4][9] by Gary Borton
* [React Router, Prefetch data based on the current route][8]

In order to add new routes one has to add them to the routes array in [index.js](./index.js).

[1]: https://github.com/supasate/connected-react-router
[2]: https://github.com/ReactTraining/react-router
[3]: https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
[4]: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/StaticRouter.md
[5]: https://github.com/supasate/connected-react-router#step-2
[6]: https://alligator.io/react/react-router-ssr/
[7]: https://github.com/ReactTraining/react-router/blob/master/packages/react-router-config/README.md#matchroutesroutes-pathname
[8]: https://reacttraining.com/react-router/web/guides/server-rendering/data-loading
[9]: https://medium.com/airbnb-engineering/server-rendering-code-splitting-and-lazy-loading-with-react-router-v4-bfe596a6af70
