# CLIENT

[React components](./components) and [scss styles](./styles) for the client
are placed here in the client directory.

## React components

A directory of a react component should look similar to this example:

```
// <App />
__mocks__/app.data.json
__tests__/index.test.js
__tests__/component.test.js
index.js
index.stories.js
component.js
styles.scss
README.md
```

One can find an example by looking at the [App](./components/app) component.

## SCSS styles

The [styles](./styles) directory contains the main entry point for the generated
styles file for the client. It imports utilities (eg. [globals.scss](./styles/utils/globals.scss))
already. Once you have added a new component you have to add the component's
.scss file into [main.scss](./styles/main.scss).
