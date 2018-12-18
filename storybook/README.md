# Storybook

The boilerplate comes along with a [storybook][1] to present components
in an isolated (and mocked) environment to other developers and your clients.

## Start Storybook

Running storybook not only requires to exectute `npm run storybook` but also
`npm run start:server`. If you want to enter the watch mode of the
server run `npm run watch:server` as well. We recommend to run storybook
together with the server in watch mode.

## Static files

The storybook is able to deliver static files, because we implemented a solution
in [middleware.js](./middleware.js). The solution is based on [indiesquidge's
solution](https://github.com/storybooks/storybook/issues/208#issuecomment-306953718).

## Available features and toolset

* [Apollo Client and GQL Endpoint Mocking](./gql/README.md)
* [Mocked Redux Store](./redux/README.md)

[1]: https://github.com/storybooks/storybook
