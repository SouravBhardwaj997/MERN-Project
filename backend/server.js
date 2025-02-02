import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/db.js";
import productRoute from "./routes/product.route.js";
const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("hello");
});

app.use("/api/products", productRoute);

app.listen(PORT, () => {
  connectToDB();
  console.log("Sever is running at port ", PORT);
});

// HMyVwEuy4cdyWA2X
