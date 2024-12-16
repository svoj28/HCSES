import History from "../models/transaction.model.js";
import mongoose from "mongoose";


// Fetch cart by orderID
export const getHistoryByOrderID = async (req, res) => {
  const { orderID } = req.params;

  try {
    const history = await History.findOne({ orderID });
    if (!history) {
      return res.status(404).json({ message: 'History not found' });
    }
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

//Fetch
export const getHistory = async (req, res) =>{
    try {
        const history = await History.find({});
        if (history.length === 0) {
            return res.status(204).json({ success: true, data: [] });
        }
        res.status(200).json({ success: true, data: history });
    } catch (error) {
        console.error("Error in fetching History: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

//Create
export const createHistory = async (req, res) => {
  console.log('Received data:', req.body);

  try {
    const { orderID, name, price, customer_name, delivery_date, address } = req.body;

    if (!name || !price || !customer_name || !delivery_date || !address) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

  const newHistory = new History({
    orderID,
    name,
    price,
    customer_name,
    delivery_date,
    address,
  });
  const savedHistory = await newHistory.save();
  res.status(201).json(savedHistory);
} catch (error) {
  console.error('Error creating history:', error.message);
  res.status(500).json({ message: 'Server error' });
}
};

  
  
//Update
export const updateHistory = async (req, res) => {
    const {id} = req.params
  
    const history = req.body;

    // if(mongoose.Types.ObjectId.isValid(id)){
    //     res.status(404).json({success: false, message: "Invalid Product"})
    // }

    try {
        const updatedHistory = await History.findByIdAndUpdate(id, history, {new:true});
        res.status(200).json({success: true, data: updatedCart});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"})
    }
}

//Delete
export const deleteHistory = async (req, res) => {
    const {id} = req.params
    
    try {
        await History.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "History Deleted"});
    } catch (error) {
        res.status(404).json({success: false, message: "History not Found"})
    }

    // async function getOrderDetails(orderId) {
    //     try {
    //       const order = await mongoose.models.Order.findById(orderId);
    //       return order ? order.toJSON() : null;
    //     } catch (error) {
    //       console.error('Error finding order:', error);
    //       return null;
    //     }
    //   }  
};
