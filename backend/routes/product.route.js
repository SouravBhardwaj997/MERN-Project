import { Router } from "express";
import {
  getAllProduct,
  createNewProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";
const router = Router();

router.post("/", createNewProduct);

router.get("/", getAllProduct);

router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct);

export default router;
