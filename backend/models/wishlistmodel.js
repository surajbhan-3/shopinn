const mongoose = require("mongoose")
const {Schema}=  require("mongoose")
const {UserModel} = require("../models/usermodel")
const {ProductModel} = require("../models/productmodel")

const wishlistSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'UserModel' },
    products: [{ type: Schema.Types.ObjectId, ref: 'product' }],
    
  });
  
  const WishlistModel = mongoose.model('Wishlist', wishlistSchema);

  module.exports = {WishlistModel}
  