const { gql } = require("apollo-server-express");

module.exports = gql`

  type Product {
    _id: ID!
    name: String!
    description: String!
    amount: Number!
    images: [String]
  }


  input ProductInput {
    name: String!
    description: String!
    amount: Float!
  }

  type Query {
    products: [Product]
  }
  type Mutation {
    createProduct(input: [ProductInput]): [Product]
  }
`;
