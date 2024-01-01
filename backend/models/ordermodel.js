const mongoose = require("mongoose")
const Schema = mongoose

const orderSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [{ type: Schema.Types.ObjectId, ref: 'product' }],
    orderStatus: String,
    paymentDetails: { type: Schema.Types.ObjectId, ref: 'payment' },
   
  });
  
  const OrderModel = mongoose.model('order', orderSchema);
  

  module.exports = {OrderModel}

