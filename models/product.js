const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, default: null },
    description: { type: String, default: null },
    amount: { type: Number, default: null },
    pictures: [String],
    creator: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Account",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
