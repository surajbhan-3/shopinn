const mongoose = require("mongoose");
const {AddressModel} = require("../models/addressmodel")
const {OrderModel} = require("../models/ordermodel")
const { Schema } = mongoose;

const  userUpdateSchema =  mongoose.Schema({

    firstname:{type:String, required:true,minlength:4, maxlength:50},
    lastname:{type:String, required:true,minlength:4, maxlength:50},
    dateOfbirth:{type:Date},
    avtar:{type:String, default:"https://res.cloudinary.com/dyoqjirba/image/upload/v1699247742/shopinn/Defalut_user_avtar/blank-profile-picture-973460_1280_cnbkyc.webp"},
    gender:{type:String, enum:["male","female", "other"], default:"NA"},
    createdAt: { type: Date,default: Date.now },
    updatedAt: { type: Date },
    address: [{ type: Schema.Types.ObjectId, ref: 'AddressModel' }],
    orders: [{ type: Schema.Types.ObjectId, ref: 'OrderModel' }],

})

userUpdateSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
  });

const UserUpdateModel = mongoose.model("User", userSchema);

module.exports={UserUpdateModel}


