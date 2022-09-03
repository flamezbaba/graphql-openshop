const { artifacts } = require("hardhat");
const Product = require("../../models/product");

module.exports = {
  Query: {
    products: async () => {
      try {
        const records = await Product.find();
        return records.map((data) => {
          return {
            ...data._doc,
            _id: data.id,
          };
        });
      } catch (err) {
        throw err;
      }
    },
  },

  Mutation: {
    createProduct: async (parent, args, { req }) => {
      if (!req.isAuth) {
        throw new Error("Authorized");
      }

      try {
        const existingRecord = await Product.findOne({
          name: args.input.name,
        });

        if (existingRecord) {
          throw new Error("Product Name Used");
        }
        const newRecord = new Product({
          name: args.input.name,
          description: args.input.description,
          amount: args.input.amount,
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
    updateProduct: async (parent, args, { req }) => {
      if (!req.isAuth) {
        throw new Error("Authorized");
      }

      try {
        const record = await Product.findById(args.input.id);

        if (!record) {
          throw new Error("Product Not Found");
        }

        const existingRecord = await Product.findOne({
          name: args.input.name,
        });

        if (existingRecord && existingRecord.id != record.id) {
          throw new Error(`Product name '${args.input.name}' already used`);
        }

        const doc = await Product.findByIdAndUpdate(args.input.id, {
          name: args.input.name || record._doc.name,
          description: args.input.description || record._doc.description,
          amount: args.input.amount || record._doc.amount,
        });

        return {
          ...doc._doc,
          _id: doc.id,
        };
      } catch (err) {
        throw err;
      }
    },
  },
};
