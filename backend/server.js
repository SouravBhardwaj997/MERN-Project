import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/db.js";
import productRoute from "./routes/product.route.js";
import path from "path";
const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());

app.use("/api/products", productRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));
  app.get("*", (req, res) => {
    return res.send(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectToDB();
  console.log("Server is running at port ", PORT);
});
