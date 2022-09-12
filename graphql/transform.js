const Account = require("../models/account");
const Product = require("../models/product");

const account = async (id) => {
    try {
        const user = await Account.findById(id);
        return {
          ...user._doc,
          _id: user.id,
        };
      } catch (err) {
        throw err;
      }
};

module.exports = {
  transformProduct: (record) => {
    return {
      ...record._doc,
      _id: record.id,
      creator: account.bind(this, record.creator)
    };
  },
};
