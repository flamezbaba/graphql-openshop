const Product = require("../../models/product");
const { transformProduct } = require("../transform");

module.exports = {
  Query: {
    products: async () => {
      try {
        const records = await Product.find();
        return records.map((data) => {
          return transformProduct(data);
        });
      } catch (err) {
        throw err;
      }
    },
  },

  Mutation: {
    createProduct: async (parent, args, { req }) => {
      if (!req.isAuth) {
        throw new Error("Un-Authorized");
      }

      try {
        const existingRecord = await Product.findOne({
          name: args.input.name,
        });

        if (existingRecord) {
          throw new Error("Product Name already Used");
        }
        const newRecord = new Product({
          name: args.input.name,
          description: args.input.description,
          amount: args.input.amount,
          pictures: [],
          creator: req.userId,
        });

        const result = await newRecord.save();
        return transformProduct(result);
      } catch (err) {
        throw err;
      }
    },
    updateProduct: async (parent, args, { req }) => {
      if (!req.isAuth) {
        throw new Error("Authorized");
      }

      try {
        const record = await Product.findById(args.id);

        if (!record) {
          throw new Error("Product Not Found");
        }

        const existingRecord = await Product.findOne({
          name: args.input.name,
        });

        if (existingRecord && existingRecord.id != record.id) {
          throw new Error(`Product name '${args.input.name}' already used`);
        }

        await Product.findByIdAndUpdate(args.id, {
          name: args.input.name || record._doc.name,
          description: args.input.description || record._doc.description,
          amount: args.input.amount || record._doc.amount,
        });

        const doc = await Product.findById(args.id);

        return transformProduct(doc);
      } catch (err) {
        throw err;
      }
    },
    deleteProduct: async (parent, args, { req }) => {
      if (!req.isAuth) {
        throw new Error("Authorized");
      }

      try {
        const record = await Product.findById({ _id: args.id });
        if (!record) {
          throw new Error("Product Not Found");
        }

        await Product.deleteOne({
          _id: args.id,
        });

        return transformProduct(record);
      } catch (err) {
        throw err;
      }
    },
  },
};
