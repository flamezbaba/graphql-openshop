const { gql } = require("apollo-server-express");

//types query/mutation/subscription
module.exports = gql`

  type Query {
    hello: String!
  }

  type HelloType{
    name: String!
  }


  # mutations
  type Mutation {
    createHello(name: String!): HelloType!
  }
`;