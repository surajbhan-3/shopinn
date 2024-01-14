const {ProductModel} = require("../models/productmodel")
const {WishlistModel} = require("../models/wishlistmodel")
const {CartModel} = require("../models/cartmodel")
const {ReviewModel} = require("../models/reviewmodel")
const { OrderModel } = require("../models/ordermodel")
const {UserModel} = require("../models/usermodel")
const {uploadImageToCloudinary} = require("../utils/adminCloudinary")


// *** admin route

const getAllusers = async(req,res)=>{

    try {
      const alluser = await UserModel.find();
       
       return res.status(200).send(alluser)

    } catch (error) {
      return res.status(500).send({"Message":"Internal Server Error"})
    }
}

const addProduct = async(req,res)=>{
     
     const { productName,
             productBrand,
             price,category,
             subcategory,
            description,
            gender      } = req.body 

    try {
      const avtarFilePath = req.file.path
      const avtar =   await uploadImageToCloudinary(avtarFilePath)
      if(!avtar){
        return res.status(500).send({"message":"there is issume in image upload ot cloudinamry"})
      } 

      const newProduct = new ProductModel({
                                              name:productName,
                                              brand:productBrand,
                                              imageUrl:avtar.url,
                                              price:price,
                                              description:description,
                                              category:category,
                                              subcategory:subcategory,
                                              gender:gender

                                             });
    //   console.log(newProduct)
      await newProduct.save();
      return res.status(201).json({status:"success","message":"Data has benn added Successfully"})

    } catch (error) {
      console.log(error)
       return res.status(500).json({status:"error", message:"Internal Server Error", Error:error.message})
    }
    
}


const deleteProduct = async(req,res)=>{
 const {productId} = req.body;
   
   try {
      const deleteSingleProduct = await ProductModel.findByIdAndDelete({_id:productId})
       
      res.status(200).send({"Message":"Product delete successfully"});
   } catch (error) {
      res.status(500).send({"Message":"Internal Server Error"})
   }
}

const updateProduct  = async(req,res)=>{
  console.log('heelo')
  const { productName,
    brandName,
    price,category,
    subcategory,
   description,
   gender  , productId   } = req.body 
   console.log(req.body, "this is reqbody")
   try {
     const product  = await ProductModel.findOne({_id:productId})
    
      if(!product){
          return res.status(404).send("Product not foung")
      }

      product.name = productName,
      product.brand = brandName,
      product.subcategory = subcategory,
      product.price = price,
      product.category = category,
      product.description = description,
      product.gender = gender,

      await product.save()
      return res.status(200).send({"Message":"Data has beeen saved"})
      
   } catch (error) {
    console.log(error)
      return res.status(500).send({"Message":"Internal server error",Error:error.message})
   }
}


const  updateProductImage = async(req,res)=>{
   console.log("update image")
  const {productId} = req.body;
        try {
          const product = await ProductModel.findOne({_id:productId})
          if (!product) {
            return res.status(404).json({ error: 'Product not found' });
          }
          const avtarFilePath = req.file.path 
          const avtar =   await uploadImageToCloudinary(avtarFilePath)
          if(!avtar){
            return res.status(500).send({"message":"there is issume in image upload ot cloudinamry"})
          } 
          console.log(avtar.url)
          product.imageUrl = avtar.url;

          await product.save();
          return res.send({"Message":"Image has been updated"})
       
        } catch (error) {
          return res.status(200).send()
        }
        
}
const singleProduct = async (req,res)=>{
     const productId = req.params.id
     console.log(req.body)
          try {
              console.log(productId, "hey i have reached here")
            const product = await ProductModel.findOne({_id:productId})
             return res.status(200).send(product)
            
          } catch (error) {
            console.log(error)
            return res.status(500).send({"Message":"Internal Server Error"})
          }
}

const getProductsByCategory = async(req,res)=>{
      const {category} = req.params
          try {
            const categoryProducts  =  await ProductModel.find({category:category})
            return res.status(200).send(categoryProducts);
          } catch (error) {
            return res.status(500).send({"Message":"Internal server error"});
          }
}




module.exports = {
  getAllusers,
   deleteProduct, 
   updateProduct, 
   addProduct,
   getProductsByCategory,
   singleProduct,
   updateProductImage

   }
