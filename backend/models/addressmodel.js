const mongoose = require("mongoose")
const {UserModel} = require("../models/usermodel")
const  Schema  = mongoose;


const addressSchema =  mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'UserModel', required:true },
    address:{type:String, required:true},
    city: {type:String, required:true},
    postalCode: {type:String, required:true},
    landmark:{type:String, required:true}
  });
  
  const AddressModel = mongoose.model('addresses', addressSchema);

  module.exports = {AddressModel}
