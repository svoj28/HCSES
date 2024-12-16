import express from 'express';
import { createCustomItems, deleteCustomItems, getCustomItemsByOrderID, getCustomItems, updateCustomItems } from '../controllers/customizeditems.controller.js';

const router = express.Router();

//GET all customItems
router.get("/", getCustomItems);

//GET customItems by orderID
router.get("/:orderID", getCustomItemsByOrderID);

//CREATE
router.post("/", createCustomItems);

//UPDATE
router.put("/:id", updateCustomItems);

//DELETE
router.delete("/:id", deleteCustomItems);

export default router;
