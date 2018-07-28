# SERVER

As our node server of choice we selected [hapijs](https://hapijs.com/). It is fast
reliable and easy to use.

Currently the following files exist:

* [handler.js](./handler.js): contains a list of handlers for each route. For
  example the data for the index.html delivered from the server is prepared here.
* [render.js](./handler.js): prepares and returns the html for the client
* [routes.js](./handler.js): registers and sets up the routes for the server
* [server.js](./handler.js): creates the actual hapi server and also start its right
  away
