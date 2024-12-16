import CustomizedItems from "../models/customizeditems.model.js";
import mongoose from "mongoose";


// Fetch customizedItems by orderID
export const getCustomItemsByOrderID = async (req, res) => {
  const { orderID } = req.params;

  try {
    const CustomItems = await CustomizedItems.findOne({ orderID });
    if (!CustomItems) {
      return res.status(404).json({ message: 'CustomItem not found' });
    }
    res.status(200).json(CustomItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

//Fetch
export const getCustomItems = async (req, res) =>{
    try {
        const CustomItems = await CustomizedItems.find({});
        if (CustomItems.length === 0) {
            return res.status(204).json({ success: true, data: [] });
        }
        res.status(200).json({ success: true, data: CustomItems });
    } catch (error) {
        console.error("Error in fetching CustomItems: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

//Create
export const createCustomItems = async (req, res) => {
  console.log('Received data:', req.body);

  try {
    const { name, price, image, description, quantity } = req.body;

    if (!name || !price || !image || !description || !quantity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newCustomItems = new CustomizedItems({
      name,
      price,
      image,
      description,
      quantity
    });

    const savedCustomItems = await newCustomItems.save();
    res.status(201).json({ success: true, data: savedCustomItems });
  } catch (error) {
    console.error('Error creating CustomItems:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


  
  
//Update
export const updateCustomItems = async (req, res) => {
    const {id} = req.params
  
    const CustomItems = req.body;

    // if(mongoose.Types.ObjectId.isValid(id)){
    //     res.status(404).json({success: false, message: "Invalid Product"})
    // }

    try {
        const updatedCustomItems = await CustomizedItems.findByIdAndUpdate(id, CustomItems, {new:true});
        res.status(200).json({success: true, data: updatedCustomItems});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"})
    }
}

//Delete
export const deleteCustomItems = async (req, res) => {
    const {id} = req.params
    
    try {
        await CustomizedItems.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "CustomItems Item Deleted"});
    } catch (error) {
        res.status(404).json({success: false, message: "CustomItems Item not Found"})
    }

    async function getOrderDetails(orderId) {
        try {
          const order = await mongoose.models.Order.findById(orderId);
          return order ? order.toJSON() : null;
        } catch (error) {
          console.error('Error finding order:', error);
          return null;
        }
      }  
};
