const mongoose = require("mongoose");
const { MONGO_CONNECT_STRING } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGO_CONNECT_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    })
    .then(() => console.log("DB connection successful"))
    .catch((err) => {
      console.log("database connection failed. exiting now...");
      console.error(err);
      process.exit(1);
    });
};
