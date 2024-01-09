const mongoose = require("mongoose");
const {AddressModel} = require("../models/addressmodel")
const {OrderModel} = require("../models/ordermodel")
const { Schema } = mongoose;

const  userUpdateSchema =  mongoose.Schema({
    user:{type:Schema.Types.ObjectId, ref:"User",required:true},
    firstname:{type:String, required:true,minlength:4, maxlength:50},
    lastname:{type:String, required:true,minlength:4, maxlength:50},
    dateOfBirth:{type:String, required:true},
    gender:{type:String, enum:["male","female", "other"], default:"NA", required:true},
    createdAt: { type: Date,default: Date.now },
    updatedAt: { type: Date },

})

userUpdateSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
  });

const UserUpdateModel = mongoose.model("Userupdate", userUpdateSchema);

module.exports={UserUpdateModel}


