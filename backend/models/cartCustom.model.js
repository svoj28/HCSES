import mongoose from 'mongoose';

const cartCustomSchema = new mongoose.Schema({
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
        required: true 
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
      }
});

const cartCustomizedItems = mongoose.model('cartcustomitems', cartCustomSchema);
export default cartCustomizedItems;
