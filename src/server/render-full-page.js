import boom from 'boom'
import serialize from 'serialize-javascript'

require('dotenv').config()

/** NOTE: Alternative solution (which would allow us to generate a ready to use static
 * index.html as well):
 *  - https://alligator.io/react/react-router-ssr/ (see server/index.js)
 *  - or https://github.com/cereallarceny/cra-ssr/blob/2144cc4c50195aaac11f207a672d4b0fab4f1035/server/loader.js#L45
 *
 * TODO: evaluate if index.html (with re-writing/injecting code) would be better solution
 *
 * WARNING: See the following for security issues around embedding JSON in HTML:
 * http://redux.js.org/recipes/ServerRendering.html#security-considerations
 */
export const renderFullPage = async ({ currentVersion, html, preloadedState, preloadedApollo }) => {
  try {
    return `<!DOCTYPE html>
      <html lang="de">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="/__static__/${currentVersion}/main.styles.css" />
        </head>
        <body>
          <noscript>
            Please activate Javascript to use this page.
          </noscript>
          <div id="_app">${html}</div>
          <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            window.__APOLLO_STATE__ = ${serialize(preloadedApollo)}
            window.__GLOBALS__ = ${serialize({
              apiUrl: process.env.API_HOSTS,
              currentVersion,
              gqlUrl: process.env.GQL_HOSTS,
            })}
          </script>
          <script src="/__static__/${currentVersion}/index.bundled.js" defer></script>
        </body>
      </html>`
  } catch (err) {
    console.error(err) // eslint-disable-line
    return boom.isBoom(err) ? err : boom.internal()
  }
}
