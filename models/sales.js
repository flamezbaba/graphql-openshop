const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema(
  {
    total: { type: Number, default: null },
    products: {
      type: Array,
      default: [],
    },
    creator: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Account",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sales", salesSchema);
