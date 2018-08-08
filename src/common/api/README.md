# API

The boilerplate provides two api clients for both GQL (Apollo) and other REST
endpoints (with cross-fetch).

## Apollo Client

The current setup of the Apollo client is inspired by the following existing
solutions and tutorials:

* [server-side-rendering][4] tutorial from Apollo
* [next-apollo][1]
  * especially [withData.js][2] and [initApollo.js][3]

## Apollo Utils

Some of the most important utils and features of Apollo are:

* [graphql][8]: allows fetching, preparing and enhancing the gql query in the HoC
* [graphql query options][7]
* [compose][5]: allows using multiple enhancers in a container (eg. gql and redux)
* [withApollo][6]: provides direct access to your ApolloClient instance

## Apollo Mocking

To test HoC and other components, which are using Apollo, certain mocking
techniques exist:

* [graphql-tools][10]: Build, mock, and stitch a GraphQL schema
* [Mocking][11]: How to with graphql-tools
  * [Full Example][12]
* [Mocking your Server with just one line of code][13]
* [MockedProvider][9]: creates a mocked version of the ApolloProvider that does
  not send out network requests

[1]: https://github.com/adamsoffer/next-apollo
[2]: https://github.com/adamsoffer/next-apollo/blob/f3647a8cfdbfd3606d1272bca8028c8407ab8cec/src/withData.js
[3]: https://github.com/adamsoffer/next-apollo/blob/develop/src/initApollo.js
[4]: https://www.apollographql.com/docs/react/features/server-side-rendering.html#server-initialization
[5]: https://www.apollographql.com/docs/react/api/react-apollo.html#compose
[6]: https://www.apollographql.com/docs/react/api/react-apollo.html#withApollo
[7]: https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-options
[8]: https://www.apollographql.com/docs/react/api/react-apollo.html#graphql
[9]: https://www.apollographql.com/docs/react/api/react-apollo.html#MockedProvider
[10]: https://github.com/apollographql/graphql-tools
[11]: https://www.apollographql.com/docs/graphql-tools/mocking.html
[12]: https://www.apollographql.com/docs/graphql-tools/generate-schema.html#example
[13]: https://blog.apollographql.com/mocking-your-server-with-just-one-line-of-code-692feda6e9cd
