const {ProductModel} = require("../models/productmodel")
const {WishlistModel} = require("../models/wishlistmodel")
const {CartModel} = require("../models/cartmodel")
const {ReviewModel} = require("../models/reviewmodel")
const { OrderModel } = require("../models/ordermodel")
const {UserModel} = require("../models/usermodel")


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

   

    try {

      const newProduct = new ProductModel(req.body);
    //   console.log(newProduct)
      await newProduct.save();
      return res.status(200).json({"Message":"Data has benn added Successfully"})


      
    } catch (error) {
       return res.status(500).json({"Message":"Internal Server Error"})

    }
    
}


const deleteProduct = async(req,res)=>{
 const productId = req.body.params;
   
   try {
      const deleteSingleProduct = await ProductModel.findByIdDelete({_id:productId})
      res.status(200).send({"Message":"Product delete successfully"});
   } catch (error) {
      
   }
}

const updateProduct  = async(req,res)=>{

   try {
      
   } catch (error) {
      
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
   getProductsByCategory

   }