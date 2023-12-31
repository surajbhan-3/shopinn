const mongoose= require("mongoose");
const TokenBlacklsitSchmea  = new mongoose.Schema({
    token:{type:String, required:true, unique:true},
    createdAt:{
        type:Date,
        default:Date.now
    }
})


const TokenBlacklist = mongoose.model("TokenBlacklist", TokenBlacklsitSchmea);

module.exports = {TokenBlacklist};
