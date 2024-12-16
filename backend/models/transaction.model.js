import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
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
}, {
    timestamps: true
});

const History = mongoose.model('transactionHistory', HistorySchema);

export default History;