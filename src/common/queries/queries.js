import gql from 'graphql-tag'

export const queryRates = gql`
  query {
    rates(currency: "USD") {
      currency
    }
  }
`
