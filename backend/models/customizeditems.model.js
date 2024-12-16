import mongoose from 'mongoose';

const CustomItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
},
description: {
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
quantity: {
    type: Number,
    required: true
},
}, {
timestamps: true
});

const CustomizedItems = mongoose.model('customitems', CustomItemsSchema);
export default CustomizedItems;
