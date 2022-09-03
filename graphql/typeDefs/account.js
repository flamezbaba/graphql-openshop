const { gql } = require("apollo-server-express");

module.exports = gql`
  type Account {
    _id: ID!
    name: String!
    email: String!
    role: String!
    createdAt: String
    updatedAt: String
  }


  type Auth {
    userId: ID!
    token: String!
    tokenExpiration: String!
  }

  input AccountInput {
    name: String!
    password: String
    email: String!
    role: String
  }

  type Query {
    accounts: [Account]
    login(email: String!, password: String!): Auth!
  }
  type Mutation {
    createAccount(accountInput: AccountInput): Account
  }
`;
