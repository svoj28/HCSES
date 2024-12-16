import express from 'express';
import { getCartCustomItemsByOrderID, getCartCustomItems, createCartCustomItems, updateCartCustomItems, deleteCartCustomItems, addToCart } from '../controllers/cartCustom.controller.js';

const router = express.Router();

// Add to cart
router.post("/add", addToCart); 

// GET all carts
router.get("/", getCartCustomItems);

// GET cart by orderID
router.get("/:orderID", getCartCustomItemsByOrderID);

// CREATE
router.post("/", createCartCustomItems);

// UPDATE
router.put("/:id", updateCartCustomItems);

// DELETE
router.delete("/:id", deleteCartCustomItems);

export default router;
