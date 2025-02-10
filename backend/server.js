import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/db.js";
import productRoute from "./routes/product.route.js";
import path from "path";
const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/products", productRoute);

app.listen(PORT, () => {
  connectToDB();
  console.log("Server is running at port ", PORT);
});
