const mongoose = require("mongoose")


const paymentSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    cardNumber: String,
    expirationDate: String,
  
  });
  
  const PaymentModel = mongoose.model('payment', paymentSchema);
  
  module.exports = {PaymentModel}

