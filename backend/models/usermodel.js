const mongoose = require("mongoose");



const  userSchema =  mongoose.Schema({

    username:{type:String, required:true,minlength:4, maxlength:50, unique:true, trim:true},//With trim: true specified, any leading or trailing spaces in the username and email fields will be automatically removed when the data is saved to the database.
    email: { type:String, required:true, unique:true, maxlength:50, lowercase:true,
      validate: { validator: function (value) { // Regular expression for email validation
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      }}},
    password:{type:String, required:true, trim:true}, // Prevent password from being selected by default  
    role:{type:String, enum:["admin", "user"], default:"user"},
    avtar:{type:String, default:"https://res.cloudinary.com/dyoqjirba/image/upload/v1699247742/shopinn/Defalut_user_avtar/blank-profile-picture-973460_1280_cnbkyc.webp"},
    createdAt: { type: Date,default: Date.now },
    updatedAt: { type: Date },
   

})

userSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
  });

const UserModel = mongoose.model("User", userSchema);

module.exports={UserModel}


