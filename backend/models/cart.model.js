import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  orderID: {
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  image: { 
    type: String, 
  },
  customer_name: { 
    type: String, 
    required: true 
  },
  delivery_date: { 
    type: Date, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  additional_info: { 
    type: String 
  },
  user_id:{
    type: String,
    required: true,
    default: "Walkin Customer"
  },
  order_status:{
    type: String,
    
  },
  event_status:{
    type: String,
   
  },
  cancellation_status:{
    type: String
  }
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
