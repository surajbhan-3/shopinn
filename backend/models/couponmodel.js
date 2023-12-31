const mongoose = require("mongoose")

const couponSchema = mongoose.Schema({
    code: String,
    discount: Number,
    // Other coupon-related fields
  });
  
  const CouponModel = mongoose.model('coupon', couponSchema);

  module.exports = {CouponModel};

  