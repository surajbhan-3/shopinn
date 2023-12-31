const mongoose = require("mongoose")


const orderSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'UserModel' },
    products: [{ type: Schema.Types.ObjectId, ref: 'ProductModel' }],
    orderStatus: String,
    paymentDetails: { type: Schema.Types.ObjectId, ref: 'PaymentModel' },
   
  });
  
  const OrderModel = mongoose.model('order', orderSchema);
  

  module.exports = {OrderModel}

