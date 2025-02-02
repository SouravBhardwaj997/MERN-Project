import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).send({ success: true, data: products });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const createNewProduct = async (req, res) => {
  const { name, price, imageUrl } = req.body;
  try {
    if (!name || !price || !imageUrl) {
      return res
        .status(400)
        .send({ sucess: false, message: "All Fields are required" });
    }
    const product = await Product.create({
      name,
      price,
      imageUrl,
    });
    return res.status(201).send({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: error._message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({ success: false, message: "Wrong Id" });
  }
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    console.log(deletedProduct);
    return res.status(200).send({ success: true });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { name, price, imageUrl } = req.body;
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        imageUrl,
      },
      { new: true }
    );
    return res.status(200).send({ success: true, data: updatedProduct });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
