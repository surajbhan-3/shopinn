const mongoose = require("mongoose")


const paymentSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    razorpayOrderId:{type:String},
    razorpayPaymentId:{type:String},
  
  });
  
  const PaymentModel = mongoose.model('payment', paymentSchema);
  
  module.exports = {PaymentModel}

