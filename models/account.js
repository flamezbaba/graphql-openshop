const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    name: { type: String, default: null },
    password: { type: String, default: null },
    email: { type: String, default: null },
    role: { type: String, default: "staff" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Account", accountSchema);
