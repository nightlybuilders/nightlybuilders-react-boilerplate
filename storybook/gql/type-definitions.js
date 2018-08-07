export const typeDefs = `
  type Rates {
    currency: String
  }

  type Query {
    rates(currency: String): [Rates]
  }

  schema {
    query: Query
  }
`
