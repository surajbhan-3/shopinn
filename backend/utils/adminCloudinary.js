const cloudinary = require('cloudinary').v2;
const fs = require("fs");
require("dotenv").config()



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  
  const uploadImageToCloudinary = async (filePath)=>{
       try {
        
         if(!filePath){
            return  "There is an error in file path"
         }
       const response=  await  cloudinary.uploader.upload(filePath, {resource_type:"image",folder:"shopinn_products"})
         console.log("file is uploaded successfully", response, "this is response ")
         return response
       } catch (error) {
        console.log(error.message, "error message")
         fs.unlinkSync(filePath)
         return "unlinked image"
       }
  }
  
  module.exports = {uploadImageToCloudinary}
