const { gql } = require("apollo-server-express");

module.exports = gql`
  type Sales {
    _id: ID!
    total: Float!
    items: [ItemsSold]
    creator: Account!
    createdAt: String
    updatedAt: String
  }

  type ItemsSold{
    product: Product
    amount: Float!
    quantity: Float!
    totalPrice: Float!
  }

  input ProductSoldInput{
    productID: ID!
    quantity: Float!
  }

  type Query {
    sales: [Sales]!
    sale(id: ID!): Sales!
  }

  type Mutation {
    createSales(input: [ProductSoldInput!]!): Sales
    updateSales(id: ID!, input: ProductSoldInput): Sales
    deleteSales(id: ID!): Sales
  }
`;
