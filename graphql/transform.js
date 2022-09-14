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

const product = async (id) => {
  try {
    const record = await Product.findById(id);
    return {
      ...record._doc,
      _id: record.id,
    };
  } catch (err) {
    throw err;
  }
};

const transformProduct = (record) => {
  return {
    ...record._doc,
    _id: record.id,
    creator: account.bind(this, record.creator),
  };
};

const transformSales = async (record) => {
  const items = await Promise.all(record.products.map(async (data) => {
    const product = await Product.findById(data.productID);
    return {
      ...data,
      product: transformProduct(product),
    };
  }));

  const last = {
    _id: record.id,
    total: record.total,
    items: await items,
    creator: account.bind(this, record.creator),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt
  };

  return last;
};

module.exports = { transformProduct, transformSales };
