const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.set({ strictQuery: true });
  mongoose.connect(
    url,
    { useNewUrlParser: true },
    { useFindAndModify: false },
    { useCreateIndx: true },
    { useUnifiedTopology: true }
  );
};

module.exports = connectDB;
