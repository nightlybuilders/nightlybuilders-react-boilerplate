# Storybook

The boilerplate comes along with a [storybook][1] to present components
in an isolated (and mocked) environment to other developers and your clients.

## Start Storybook

Running storybook not only requires to exectute `npm run storybook` but also
`npm run start:server` (or `npm run watch:server`). If you change anything in
`src/static` (eg. adding new images) you must run `npm run build:dev` once again.
Because only then the new files are copied into the `dist` folder (used for
delivering static files from the node server).

## Static files

The storybook is able to deliver static files, because we implemented a solution
in [middleware.js](./middleware.js). The solution is based on [indiesquidge's
solution](https://github.com/storybooks/storybook/issues/208#issuecomment-306953718).

## Available features and toolset

* [Apollo Client and GQL Endpoint Mocking](./gql/README.md)
* [Mocked Redux Store](./redux/README.md)

[1]: https://github.com/storybooks/storybook
