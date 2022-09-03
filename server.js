require("dotenv").config();
require("./database").connect();
const { ApolloServer } = require("apollo-server-express");
const http = require("http");
const express = require("express");
const isAuth = require("./middleware/auth");


const cors = require("cors");
const path = require("path");

const { makeExecutableSchema } = require("graphql-tools");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");

const app = express();
app.use(cors());
app.use(express.json());
app.use(isAuth);

const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "./graphql/typeDefs"))
);

// console.log("schemas", schemas);
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "./graphql/resolvers"))
);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

app.get("/rest", function (req, res) {
  res.json({
    data: "API is working...",
  });
});

const port = process.env.PORT || 4000;

apolloServer.start().then((res) => {
  apolloServer.applyMiddleware({ app });
  app.listen(
    port,
    () => console.log(`Server running on port ${port} 🔥`)
  );
});

