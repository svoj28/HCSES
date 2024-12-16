import express from 'express';
import { createHistory, deleteHistory, getHistory, getHistoryByOrderID, updateHistory  } from '../controllers/transaction.controller.js';

const router = express.Router();

//GET all History
router.get("/", getHistory);

//GET History by orderID
router.get("/:orderID", getHistoryByOrderID);

//CREATE
router.post("/", createHistory);

//UPDATE
router.put("/:id", updateHistory);

//DELETE
router.delete("/:id", deleteHistory);

export default router;
