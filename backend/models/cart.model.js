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
    type: String,
    required: true
  },
  product_name: {
    type: String,
    required: true
  },
  contact_number: {
    type: String,
    required: true
  },
  email_address: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    required: true
  },
  delivery_date: {
    type: Date,
    required: true
  },
  additional_info: {
    type: String,
    default: ""
  },
  order_status: {
    type: String,
    default: "Pending"  // Default status is 'Pending'
  },
  event_status: {
    type: String,
    default: "Upcoming"
  }
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
