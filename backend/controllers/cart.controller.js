import Cart from "../models/cart.model.js";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import TransactionHistory from "../models/transaction.model.js";

export const processOrder = async (req, res) => {
  try {
    const {
      product_name, // Add product_name here
      name,
      contact_number,
      email_address,
      home_address,
      delivery_date,
      additional_info,
      order_status,
      price,
    } = req.body;

    // Validate required fields
    if (!contact_number || !home_address || !delivery_date || !product_name) {  // Ensure product_name is present
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Generate unique order ID
    const generateRandomCode = () => Math.random().toString(36).substr(2, 10).toUpperCase();
    const orderID = generateRandomCode();

    // Create new order
    const newOrder = new Cart({
      orderID,
      price: "Pending",
      name,
      contact_number,
      email_address: email_address || "", // Optional
      address: home_address,
      delivery_date: new Date(delivery_date),
      additional_info: additional_info || "",
      product_name,  // Save the selected product_name in the order
      event_status: "Upcoming",
    });

    await newOrder.save();
    res.status(201).json({ message: "Order added successfully", data: newOrder });
  } catch (error) {
    console.error("Error processing order:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Fetch cart by orderID
export const getCartByOrderID = async (req, res) => {
  const { orderID } = req.params;

  try {
    const cart = await Cart.findOne({ orderID });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

//fetch by userid
export const getCartByUser = async (req, res) =>{
  try {
      const cart = await Cart.find({});
      if (cart.length === 0) {
          return res.status(204).json({ success: true, data: [] });
      }
      res.status(200).json({ success: true, data: cart });
  } catch (error) {
      console.error("Error in fetching Cart: ", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
  }
}

//Fetch
export const getCart = async (req, res) => {
  
  try {
      const cart = await Cart.find({  });

      if (cart.length === 0) {
          return res.status(204).json({ success: true, data: [] });
      }

      res.status(200).json({ success: true, data: cart });
  } catch (error) {
      console.error("Error in fetching Cart: ", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
  }
};

//Create
export const createCart = async (req, res) => {
  console.log('Received data:', req.body);

  try {


    const { orderID, name, price, image, customer_name, delivery_date, address, additional_info, user_id } = req.body;

    if (!name || !price || !customer_name || !delivery_date || !address) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

  const newCart = new Cart({
    orderID,
    name,
    price,
    image,
    customer_name,
    delivery_date,
    address,
    additional_info,
    user_id
  });
  const savedCart = await newCart.save();
  res.status(201).json(savedCart);
} catch (error) {
  console.error('Error creating cart:', error.message);
  res.status(500).json({ message: 'Server error' });
}
};

  
  
//Update
export const updateCart = async (req, res) => {
    const {id} = req.params
  
    const cart = req.body;

    // if(mongoose.Types.ObjectId.isValid(id)){
    //     res.status(404).json({success: false, message: "Invalid Product"})
    // }

    try {
        const updatedCart = await Cart.findByIdAndUpdate(id, cart, {new:true});
        res.status(200).json({success: true, data: updatedCart});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"})
    }
}

//Delete
export const deleteCart = async (req, res) => {
    const {id} = req.params
    
    try {
        await Cart.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Cart Item Deleted"});
    } catch (error) {
        res.status(404).json({success: false, message: "Cart Item not Found"})
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
}

export const addCart = async (req, res) => {
  console.log('Received data:', req.body);

  try {
    const { packageName, price, customerName, deliveryDate, address, contactNumber, additionalInfo } = req.body;

    // Validate required fields
    if (!packageName || !price || !customerName || !deliveryDate || !address || !contactNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Logging before creating the cart
    console.log("Creating new cart with:", {
      orderID: Math.random().toString(36).substr(2, 10).toUpperCase(),
      name: packageName,
      price,
      customer_name: customerName,
      delivery_date: new Date(deliveryDate),
      address,
      additional_info: additionalInfo || "",
      order_status: "Pending", // Default is 'Pending'
      event_status: "Upcoming", // Default is 'Upcoming'
    });

    // Create the cart document
    const newCart = new Cart({
      orderID: Math.random().toString(36).substr(2, 10).toUpperCase(),
      name: packageName,
      price,
      customer_name: customerName,
      delivery_date: new Date(deliveryDate),
      address,
      additional_info: additionalInfo || "",
      order_status: "Pending", // Default to 'Pending'
      event_status: "Upcoming", // Default to 'Upcoming'
    });

    // Save to the database
    const savedCart = await newCart.save();

    // Logging after saving the cart
    console.log("Saved Cart:", savedCart);

    res.status(201).json({ message: "Cart added successfully", data: savedCart });
  } catch (error) {
    console.error("Error adding cart:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Walkin
export const createWalkinOrder = async (req, res) => {
  const { name, price, customer_name, delivery_date, address, contact_number, additional_info } = req.body;

  // Validate required fields
  if (!name || !price || !customer_name || !delivery_date || !address) {
    return res.status(400).json({ success: false, message: "Please provide all required fields" });
  }

  const generateOrderID = () => {
    return 'ORD' + Math.random().toString(36).substr(2, 7).toUpperCase();
  };

  const orderID = generateOrderID();

  const newCart = new Cart({
    orderID,
    name, 
    price, 
    customer_name,
    delivery_date,
    address,
    contact_number,
    additional_info,
    user_id: "Walkin Customer",  
    order_status: "Pending",  
    event_status: "Upcoming", 
  });

  try {
    await newCart.save();  
    res.status(201).json({ success: true, data: newCart });
  } catch (error) {
    console.error("Error in Create cart: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// For Approval
export const approveCart = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCart = await Cart.findByIdAndUpdate(id, { order_status: 'approved' }, { new: true });
    if (!updatedCart) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.json({ message: 'Cart approved successfully', data: updatedCart });
  } catch (error) {
    console.error('Error approving cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



// Disapprove Cart (Delete)
export const disapproveCart = async (req, res) => {
  const {id} = req.params
    
    try {
        await Cart.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Cart Item Deleted"});
    } catch (error) {
        res.status(404).json({success: false, message: "Cart Item not Found"})
    }
};


// Update Event Status (Upcoming, Ongoing, Completed)
export const updateEventStatus = async (req, res) => {
  try {
    const { id } = req.params; 
    const { status } = req.body; 

    if (!['upcoming', 'ongoing', 'completed'].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedCart = await Cart.findByIdAndUpdate(id, { event_status: status }, { new: true });
    if (!updatedCart) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.json({ message: `Event status updated to ${status}`, data: updatedCart });
  } catch (error) {
    console.error('Error updating event status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


