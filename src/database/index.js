import mongoose from "mongoose";

const connectToDB = async () => {
  const url =
    "mongodb+srv://boluwatifeomirinde080:<password>@blog.li42ds6.mongodb.net/?retryWrites=true&w=majority&appName=Blog";

  mongoose
    .connect(url)
    .then(() => console.log("Database Connection is Successful"))
    .catch((e) => console.log(e));
};

export default connectToDB;
