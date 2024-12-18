import express from 'express';
import { deleteProduct, updateProduct, getProduct, createProduct, createPromo} from '../controllers/product.controller.js';

const router = express.Router();

//GET
router.get("/", getProduct);

//CREATE
router.post("/", createProduct);
router.post("/promo", createPromo);

//UPDATE
router.put("/:id", updateProduct);

//DELETE
router.delete("/:id", deleteProduct);

router.patch("/:id", updateProduct); 

export default router;