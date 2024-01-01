const mongoose = require("mongoose")
const Schema = require("mongoose") // this import is neccessary when using Schema types

const reviewSchema = mongoose.Schema({

    product:{type:Schema.Types.ObjectId,ref:"product"},
   
    reviews:[{
        user:{type:Schema.Types.ObjectId, ref:"User"},
        rating:{type:Number, min:1, max:5},
        reviewTitle:{type:String, required:true},
        reviewData:{type:String, required:true}
    }],
    createdAt: { type: Date,default: Date.now },
    updatedAt: { type: Date },
})


reviewSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
  });


  const ReviewModel = mongoose.model("Review", reviewSchema);

  module.exports = {ReviewModel};
  
  