import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongo DB Connect Successfully ");
  } catch (error) {
    console.log("Error while connecting MongoDB: ", error);
  }
};

export default connectToDB;
