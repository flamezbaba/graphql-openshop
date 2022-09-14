const Sales = require("../../models/sales");
const Product = require("../../models/product");
const { transformSales } = require("../transform");

module.exports = {
  Query: {
    sales: async () => {
      try {
        const records = await Sales.find();
        return records.map((data) => {
          return transformSales(data);
        });
      } catch (err) {
        throw err;
      }
    },
    sale: async (parent, { id }, req) => {
      try {
        const record = await Sales.findById(id);
        if (!record) {
          throw new Error("record not found");
        }

        return transformSales(record);
      } catch (err) {
        throw err;
      }
    },
  },

  Mutation: {
    createSales: async (parent, { input }, { req }) => {
      if (!req.isAuth) {
        throw new Error("Unauthorized");
      }

      try {
        let totalAmount = 0;

        const calcProducts = await Promise.all(
          input.map(async (data) => {
            const currentProduct = await Product.findById(data.productID);
            if (currentProduct) {
              const totalPrice = currentProduct.amount * data.quantity;
              totalAmount = totalAmount + totalPrice;

              return {
                ...data,
                totalPrice: totalPrice,
                amount: currentProduct.amount,
              };
            }
          })
        );

        const newRecord = new Sales({
          total: totalAmount,
          products: calcProducts,
          creator: req.userId,
        });

        const result = await newRecord.save();
        return transformSales(result);
      } catch (err) {
        throw err;
      }
    },
    updateSales: async (parent, args, { req }) => {
      if (!req.isAuth) {
        throw new Error("unauthorized");
      }

      try {
        const record = await Sales.findById(args.id);

        if (!record) {
          throw new Error("record not found");
        }

        let totalAmount = 0;

        const calcProducts = await Promise.all(
          args.input.map(async (data) => {
            const currentProduct = await Product.findById(data.productID);
            if (currentProduct) {
              const totalPrice = currentProduct.amount * data.quantity;
              totalAmount = totalAmount + totalPrice;

              return {
                ...data,
                totalPrice: totalPrice,
                amount: currentProduct.amount,
              };
            }
          })
        );

        await Sales.findByIdAndUpdate(args.id, {
          total: totalAmount,
          products: calcProducts,
        });

        const doc = await Sales.findById(args.id);

        return transformSales(doc);
      } catch (err) {
        throw err;
      }
    },
    deleteSales: async (parent, args, { req }) => {
      if (!req.isAuth) {
        throw new Error("unauthorized");
      }

      try {
        const record = await Sales.findById({ _id: args.id });
        if (!record) {
          throw new Error("record not found");
        }

        await Product.deleteOne({
          _id: args.id,
        });

        return transformSales(record);
      } catch (err) {
        throw err;
      }
    },
  },
};
