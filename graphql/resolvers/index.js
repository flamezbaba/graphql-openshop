module.exports = {
  Query: {
    hello: () => {
      return "hello guys";
    },
  },

  Mutation: {
    createHello: (parent, args, context) => {
      return {
        name: args.input,
      };
    },
  },
};
