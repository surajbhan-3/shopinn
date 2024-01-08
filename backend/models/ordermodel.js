const mongoose = require("mongoose")
const Schema = mongoose

const orderSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [
                 { productId:{ type: Schema.Types.ObjectId, ref: 'product', required:true }, 
                  count:{type:Number, required:true},
                }
              ],
    orderStatus:{type:Boolean},
    paymentDetails: { type: Schema.Types.ObjectId, ref: 'payment' },
   
  });
  
  const OrderModel = mongoose.model('order', orderSchema);
  

  module.exports = {OrderModel}

