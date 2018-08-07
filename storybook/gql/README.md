# Storybook GQL Decorator

Both [mocks.js](./mocks.js) and [type-definitions.js](./type-definitions.js) simulate
and prepare a mocked GQL endpoint/server. It allows the stories to query data from
the API and execute code (eg. refetch) from the ApolloClient without further
mocking the ApolloClient.

It is mainly created with the help of [apollo-storybook-decorator](https://github.com/abhiaiyer91/apollo-storybook-decorator#full-example)
and based on their provided [example](https://github.com/abhiaiyer91/apollo-storybook-decorator/tree/5fc9345c82806930cf3d240d000f219c7a0d9867/packages/apollo-storybook-react/example/schema)

## Mocking Alternatives

* https://www.apollographql.com/docs/graphql-tools/mocking.html
* https://blog.apollographql.com/mocking-your-server-with-just-one-line-of-code-692feda6e9cd
