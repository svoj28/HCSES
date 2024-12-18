import express from 'express';
import { 
  deleteCart, 
  updateCart, 
  getCart, 
  createCart, 
  getCartByOrderID, 
  processOrder, 
  disapproveCart, 
  approveCart, 
  updateEventStatus,
  addCart,
  createWalkinOrder
} from '../controllers/cart.controller.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

router.post("/process-order", processOrder);
router.get("/", getCart); 
router.get("/:orderID", getCartByOrderID);
router.post("/", createCart); 
router.post("/walkin", createWalkinOrder)
router.put("/:id", updateCart);  
router.delete("/:id", deleteCart); 


// For approval
router.put("/approve/:id", approveCart);  
router.delete("/disapprove/:id", disapproveCart); 
router.put("/update-event-status/:id", updateEventStatus);

export default router;
