import cartCustom from "../models/cartCustom.model.js";
import mongoose from "mongoose";


// Fetch customizedItems by orderID
export const getCartCustomItemsByOrderID = async (req, res) => {
  const { orderID } = req.params;

  try {
    const cartCustomItems = await cartCustomizedItems.findOne({ orderID });
    if (!cartCustomItems) {
      return res.status(404).json({ message: 'cartCustomItem not found' });
    }
    res.status(200).json(cartCustomItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

//Fetch
export const getCartCustomItems = async (req, res) =>{
    try {
        const cartCustomItems = await cartCustomizedItems.find({});
        if (cartCustomItems.length === 0) {
            return res.status(204).json({ success: true, data: [] });
        }
        res.status(200).json({ success: true, data: cartCustomItems });
    } catch (error) {
        console.error("Error in fetching cartCustomItems: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

//Create
export const createCartCustomItems = async (req, res) => {
  console.log('Received data:', req.body);

  try {
    const { orderID, name, price, image, customer_name, delivery_date, address, additional_info } = req.body;

    if (!name || !price || !image || !customer_name || !delivery_date || !address) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

  const newCartCustomItems = new cartCustomizedItems({
    orderID,
    name,
    price,
    image,
    customer_name,
    delivery_date,
    address,
    additional_info
  });
  const savedCartCustomItems = await newCartCustomItems.save();
  res.status(201).json(savedCartCustomItems);
} catch (error) {
  console.error('Error creating cartCustomItems:', error.message);
  res.status(500).json({ message: 'Server error' });
}
};

  
  
//Update
export const updateCartCustomItems = async (req, res) => {
    const {id} = req.params
  
    const cartCustomItems = req.body;

    // if(mongoose.Types.ObjectId.isValid(id)){
    //     res.status(404).json({success: false, message: "Invalid Product"})
    // }

    try {
        const updatedCartCustomItems = await cartCustomizedItems.findByIdAndUpdate(id, cartCustomItems, {new:true});
        res.status(200).json({success: true, data: updatedCartCustomItems});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"})
    }
}

//Delete
export const deleteCartCustomItems = async (req, res) => {
    const {id} = req.params
    
    try {
        await cartCustomizedItems.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "cartCustomItems Item Deleted"});
    } catch (error) {
        res.status(404).json({success: false, message: "cartCustomItems Item not Found"})
    }


};

export const addToCart = async (req, res) => {
  console.log('Received data:', req.body);
  
  const { 
    orderID, name, price, image, customer_name, delivery_date, 
    address, additional_info, isCustomized, productId 
  } = req.body;

  if (!name || !price || !image || !customer_name || !delivery_date || !address) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    if (isCustomized) {
      const newCartCustomItems = new cartCustom({
        orderID,
        name,
        price,
        image,
        customer_name,
        delivery_date,
        address,
        additional_info
      });
      const savedCartCustomItems = await newCartCustomItems.save();
      res.status(201).json(savedCartCustomItems);
    } else {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // Update product quantity or any other logic related to cart for regular products
      product.quantity -= 1; 
      await product.save();

      res.status(201).json({ success: true, message: 'Product added to cart' });
    }
  } catch (error) {
    console.error('Error adding item to cart:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
