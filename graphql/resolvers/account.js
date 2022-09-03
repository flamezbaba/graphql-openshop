const Account = require("../../models/account");
const jwt = require("jsonwebtoken");

module.exports = {
  Query: {
    accounts: async () => {
      try {
        const records = await Account.find();
        return records.map((account) => {
          return {
            ...account._doc,
            _id: account.id,
          };
        });
      } catch (err) {
        throw err;
      }
    },
    login: async (parent, { email, password }, ctx) => {
      console.log(ctx.req.isAuth);
      try {
        const user = await Account.findOne({ email: email });
        if (!user) {
          throw new Error("invalid email");
        }

        if (user.password !== password) {
          throw new Error("invalid password");
        }

        const token = jwt.sign(
          { userId: user.id, email: user.email },
          "mysecret",
          { expiresIn: "24h" }
        );

        return { userId: user.id, token: token, tokenExpiration: 1 };
      } catch (err) {
        throw err;
      }
    },
  },

  Mutation: {
    createAccount: async (args) => {
      try {
        const existingRecord = await Account.findOne({
          email: args.accountInput.email,
        });

        if (existingRecord) {
          throw new Error("Email Used");
        }
        const newRecord = new Account({
          name: args.accountInput.name,
          password: args.accountInput.password,
          email: args.accountInput.email,
          role: args.accountInput.role,
        });

        const result = await newRecord.save();
        return {
          ...result._doc,
          _id: result.id,
        };
      } catch (err) {
        throw err;
      }
    },
    
  },
};
