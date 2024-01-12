const {ProductModel} = require("../models/productmodel")
const {WishlistModel} = require("../models/wishlistmodel")
const {CartModel} = require("../models/cartmodel")
const {ReviewModel} = require("../models/reviewmodel")
const mongoose = require("mongoose")
const { OrderModel } = require("../models/ordermodel")


const getProduct = async(req,res)=>{
    
     try {
          const allProducts = await ProductModel.find()
      return res.status(200).send(allProducts)
        
     } catch (error) {
        return res.status(500).json({"Message":"Internal Server Error"})
        
     }
}

const getSingleProduct = async (req,res)=>{
      const productId = req.params.id;
      
       try {
       


         const singleProduct = await ProductModel.find({_id:productId})

      
        const ifProductHasReviews = await ReviewModel.findOne({product:productId})

         if(!ifProductHasReviews){
          return  res.status(200).send([singleProduct, []]);
         }
         const userReviews = await ReviewModel.findOne({ product: productId })
         .populate({
           path: 'reviews.user',
         
         });
       const allReviews = userReviews.reviews

      

          const reviewDetails = allReviews.map((el)=>{
           return   {
               user:{username:el.user.username, avtar:el.user.avtar, userId:el.user._id},
               rating: el.rating,
               reviewTitle: el.reviewTitle,
               reviewData: el.reviewData,
               reviewDate:el.reviewDate
             }
          })
           console.log(reviewDetails)
        return res.status(200).send([singleProduct, reviewDetails]);
      } catch (error) {
         return res.status(500).json({"Message":"Internal Server Error", Error:error.message})
       }

}


const getProductsByCategory = async(req,res)=>{
   const {category} = req.params
   const page = req.params.pagenumber


         const skipedd =  (parseInt(page) - 1) * 3;
       try {
         const categoryProducts  =  await ProductModel.find({category:category}).skip(skipedd).limit(3)
         return res.status(200).send(categoryProducts);
       } catch (error) {
         return res.status(500).send({"Message":"Internal server error"});
       }
}



const addProductToWishList =async (req,res) =>{
     const {userId, productId} = req.body;

         try {

              if(!userId || !productId){
                 return send({"message":"falult at various level"})
              }
            let wishlist = await WishlistModel.findOne({user:userId})
         
            if(!wishlist){
               wishlist = new WishlistModel({user:userId,products:[productId]})
               // console.log("datasaved")
               await wishlist.save();
               return res.status(200).json({"Message":"Added Successfully"})
            }else{
               //   console.log("wishlist is true")
               if(!wishlist.products.includes(productId)){
                    wishlist.products.push(productId);
                  //   console.log(productId, "product id push to product array")
                   await wishlist.save();

                    return res.status(200).json({"Message":"Added Successfully"})

               }else{
                  // console.log("used", productId)

                  return res.status(409).json({"Message":"Product is already in wishlist"})
               }
            }
         } catch (error) {
          return res.status(500).json({"Message":"Internal Server Error","Error":error})
         }
}



const getProductFromWishlist = async(req,res) =>{
     const userId = req.params.userId;
       try {
          const wishlist = await WishlistModel.findOne({user:userId}).populate("products")
         console.log(wishlist)
          if (!wishlist) {
               return res.status(404).json({ message: 'Wishlist not found' });
             }
          //    await wishlist.populate('products').execPopulate();

            return res.status(200).send(wishlist); 
       } catch (error) {
          return res.status(500).json({ message: 'Internal server error',Error:error.message });

       }
}



const removeSingleProductFromWishlist = async(req,res)=>{
   const productId = req.params.id;
   const {userId} = req.body;
   console.log(userId, "sadf")
   console.log(productId)

     console.log("hel csfsd")
     try {
         const wishlist= await WishlistModel.findOne({user:userId})
        
         let products = wishlist.products
         const item = products.find((el)=>{
                    return el == productId
         })

         const itemFilter = products.filter((el)=>{
            return el !== item
             })
            wishlist.products = itemFilter;
            await wishlist.save()

        res.status(200).send({"Message":"Product removed  successfully from wishlist"});
     } catch (error) {
        res.status(500).send({"Messaged":"Internal Server Error",Error:error.message});
     }
}







const addProductToCart =async (req,res) =>{
   const {userId, productId} = req.body;
   // console.log("productId", productId)
   // console.log("userId", userId)


       try {

            if(!userId || !productId){
               return send({"message":"falult at various level"})
            }
          let cartData = await CartModel.findOne({user:userId})
         //  console.log(cartData, "this one is cart data")
       
          if(!cartData){
             cartData = new CartModel({user:userId,products:[productId]})
            //  console.log("datasaved")
             await cartData.save();
             return res.status(200).json({"Message":"Added Successfully"})
          }else{
               // console.log("cartdata is true is true")
             if(!cartData.products.includes(productId)){
                  cartData.products.push(productId);
                  // console.log(productId, "product id push to product array")
                 await cartData.save();

                  return res.status(200).json({"Message":"Added Successfully"})

             }else{
               //  console.log("used", productId)
                return res.status(409).json({"Message":"Product is already in cart"})
             }
          }
       } catch (error) {
        return res.status(500).json({"Message":"Internal Server Error","Error":error})
       }
}



const getProductFromCart = async(req,res) =>{
   const userId = req.params.id;
        try {
        const cartData = await CartModel.findOne({user:userId}).populate("products")
      //  console.log(cartData)
        if (!cartData) {
             return res.status(404).json({ message: 'CartData not found' });
           }
        //    await wishlist.populate('products').execPopulate();

          return res.status(200).send(cartData); 
     } catch (error) {
        return res.status(500).json({ message: 'Internal server error',Error:error.message });

     }
}





const removeSingleProductFromCart = async(req,res)=>{
   const productId = req.params.id;
   const {userId} = req.body;
   console.log(userId, "sadf")
   console.log(productId)

     console.log("hel csfsd")
     try {
         const cartData= await CartModel.findOne({user:userId})
        
         let products = cartData.products
         const item = products.find((el)=>{
                    return el == productId
         })

         const itemFilter = products.filter((el)=>{
            return el !== item
             })
            cartData.products = itemFilter;
            await cartData.save()

        res.status(200).send({"Message":"Product removed  successfully from wishlist"});
     } catch (error) {
        res.status(500).send({"Messaged":"Internal Server Error",Error:error.message});
     }
}



const getAllReivewsGiven = async (req, res) =>{

    const {userId} = req.body;
    const objectId = new mongoose.Types.ObjectId(userId);
    console.log(userId)
           console.log("all reivews")
          
   
        try {
         
         const allData = await   ReviewModel.aggregate(  [   {
                  $match: { "reviews.user": objectId   }  } ,
                 {    $unwind: "$reviews"    },   
                {      $match: {     "reviews.user": objectId    }   },
                {  $project: {   "review": "$reviews",  // Project only the matching review object
                     "productId":"$product",
                    "_id": 0   } }, 
                        
               ]   )

// Doing this because currently not able to make a query

          const promises =  allData.map(async(el)=>{

            const productData= await ProductModel.findOne({_id:el.productId})
           
            return{
               ...el, productData
            }
          })
       const data = await Promise.all(promises)
          
               console.log(data)
            // console.log(allData[0].productId)
            return res.status(200).send(data)
         
        } catch (error) {
         
        }
}



const deleteReview = async (req, res) =>{

    const {userId,reviewId} = req.body;
        try {
               
         const updateReviewData =    await ReviewModel.updateOne(
            { "reviews.user": objectId },
            { $pull: { reviews: { _id: reviewId } } }
          );
           
           
            console.log(userId, reviewId)
          
               console.log(updateReviewData, "udated review")
          return  res.status(200).send({"Message":"Data deleted successfully"})
         
        } catch (error) {
         return  res.status(500).send({"Message":"Internal server error"})
        }
}





const saveOrderDetails = async (req,res) =>{
       const {userId, data} = req.body;
       console.log(data,"this sis data")
        try {

         const findUser = await OrderModel.findOne({user:userId})
          if(!findUser){

               const orderData = new OrderModel({user:userId,products:data})
               await orderData.save()
               return res.send("userData saved")
          }
         
        } catch (error) {
         
             return res.send(error)
        }
}

const getPurchaseItems = async(req,res)=>{

   const {userId} = req.body;
  
    try {

     const findUser = await OrderModel.findOne({user:userId})
     console.log(findUser)
         //   const purchaseItems = await OrderModel.find 
         //   await orderData.save()
        if(!findUser){
           return res.status(404).send({Message:"No data found"})
        } 

      //   const allData = await   ReviewModel.aggregate(  [   {
      //    $match: { "reviews.user": objectId   }  } ,
      //   {    $unwind: "$reviews"    },   
      //  {      $match: {     "reviews.user": objectId    }   },
      //  {  $project: {   "review": "$reviews",  // Project only the matching review object
      //       "productId":"$product",
      //      "_id": 0   } }, 
               
      // ]   )
        const userPurchaseItems = await OrderModel.aggregate([{$match:{user:userId}},{$unwind:"$products"}])
        console.log(userPurchaseItems)

      return res.send("userData saved")
      
     
    } catch (error) {
     
         return res.send(error)
    }
}





module.exports = {
   
    
       getProduct,
    
       addProductToWishList,
       getProductsByCategory,
        getProductFromWishlist,
      addProductToCart,
      getProductFromCart,
      getSingleProduct,
      removeSingleProductFromWishlist,
      removeSingleProductFromCart,
      getAllReivewsGiven,
      deleteReview,
      saveOrderDetails,
      getPurchaseItems
   }