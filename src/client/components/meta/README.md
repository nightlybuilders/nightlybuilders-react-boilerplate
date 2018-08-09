# COMPONENT META

One can add meta tags to a page with the help of [react-helmet](https://github.com/nfl/react-helmet).

## Example

```js
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

class Application extends Component {
  render() {
    return (
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Title</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        ...
      </div>
    )
  }
}
```
