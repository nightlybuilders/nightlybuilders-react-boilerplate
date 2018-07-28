import boom from 'boom'

export const renderFullPage = async ({ currentVersion, html, preloadedState }) => {
  try {
    return `<!DOCTYPE html>
      <html lang="de">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="/static/${currentVersion}/main.styles.css" />
        </head>
        <body>
          <noscript>
            Please activate Javascript to use this page.
          </noscript>
          <div id="_app">${html}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/recipes/ServerRendering.html#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}

            window.__GLOBALS__ = {
              currentVersion: ${currentVersion}
            }
          </script>
          <script src="/static/${currentVersion}/index.bundled.js" defer></script>
        </body>
      </html>`
  } catch (err) {
    console.log(err) // eslint-disable-line
    return boom.isBoom(err) ? err : boom.internal()
  }
}
