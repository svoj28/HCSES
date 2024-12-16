import Cart from "../models/cart.model.js";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import TransactionHistory from "../models/transaction.model.js";

export const processOrder = async (req, res) => {
  try {
    const { productID, formData } = req.body;
    const user_id = req.user._id;

    // Find the product
    const product = await Product.findById(productID);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.quantity < 1) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    // Generate random order ID
    const generateRandomCode = () => Math.random().toString(36).substr(2, 10).toUpperCase();
    const orderID = generateRandomCode();

    // Prepare data
    const cartItem = {
      orderID,
      name: product.name,
      price: product.price,
      image: product.image,
      customer_name: formData.customer_name,
      delivery_date: formData.delivery_date,
      address: formData.address,
      additional_info: formData.additional_info,
      user_id,
      event_status: 'Upcoming', 
      order_status: 'Pending' 
    };

    const transactionHistoryItem = {
      orderID,
      customer_name: formData.customer_name,
      address: formData.address,
      name: product.name,
      price: product.price,
      delivery_date: new Date(formData.delivery_date).toISOString(),
      user_id,
      event_status: '',
      order_status: ''
    };

    // Add item to cart
    const newCart = new Cart(cartItem);
    await newCart.save();

    // Add to transaction history
    const newTransaction = new TransactionHistory(transactionHistoryItem);
    await newTransaction.save();

    // Update product quantity
    product.quantity -= 1;
    await product.save();

    res.status(201).json({ message: "Order processed successfully", cartItem });
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
  try {
    const { packageName, price, customerName, deliveryDate, address, contactNumber, additionalInfo } = req.body;

    if (!packageName || !price || !customerName || !deliveryDate || !address || !contactNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCart = new Cart({
      orderID: Math.random().toString(36).substr(2, 10).toUpperCase(),
      name: packageName,
      price,
      customer_name: customerName,
      delivery_date: new Date(deliveryDate),
      address,
      additional_info: additionalInfo || "",
      user_id: req.user._id || "guest",
      order_status: "Pending",
      event_status: "Upcoming",
    });

    const savedCart = await newCart.save();
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


