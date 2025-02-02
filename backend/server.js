import express from "express";
import dotenv from "dotenv";
const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  return res.send("Hello");
});

app.listen(PORT, () => {
  console.log("Sever is running at port ", PORT);
});

// HMyVwEuy4cdyWA2X
