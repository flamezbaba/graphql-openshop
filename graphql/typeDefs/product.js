const { gql } = require("apollo-server-express");

module.exports = gql`
  type Product {
    _id: ID!
    name: String!
    description: String!
    amount: Float!
    pictures: [String]
    creator: Account!
    createdAt: String
    updatedAt: String
  }

  input ProductInput {
    name: String!
    description: String!
    amount: Float!
  }

  input UpdateProductInput {
    name: String
    description: String
    amount: Float
  }

  type Query {
    products: [Product]
  }
  type Mutation {
    createProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: UpdateProductInput): Product
    deleteProduct(id: ID!): Product
  }
`;
