const mongoose = require("mongoose");
const {Schema} = require("mongoose")


const productSchema = mongoose.Schema({
    name:{type:String, required:true, trim:true, maxlength:80},
    description:{type:String, required:true,  maxlength:1000},
    brand:{type:String, required:true, trim:true},
    imageUrl:{type:String, required:true},
    price:{type:Number, required:true, min:0},
    category:{type:String, required:true, enum:["electronics", "shoes", "clothing", "furniture","books"]},
    subcategory:{type:String , required:true},
    gender:{type:String, enum:["male", "female", "unisex"] , required:true},
    createdAt: { type: Date,default: Date.now },
    updatedAt: { type: Date },

})

productSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
  });



  const ProductModel = mongoose.model("product", productSchema);
          
  module.exports = {ProductModel};

