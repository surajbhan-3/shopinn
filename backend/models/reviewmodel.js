const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema({

    product:{type:Schema.Types.ObjectId,ref:"product"},
    user:{type:Schema.Types.ObjectId, ref:"User"},
    review:[{
        rating:{type:Number, min:1, max:5},
        reviewData:{type:String}
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
  