const {ProductModel} = require("../models/productmodel")
const {WishlistModel} = require("../models/wishlistmodel")
const {CartModel} = require("../models/cartmodel")
const {ReviewModel} = require("../models/reviewmodel")
const mongoose = require("mongoose")


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
               user:{username:el.user.username, avtar:el.user.avtar},
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





module.exports = {addProduct,
      deleteProduct,
       getProduct,
       updateProduct,
       addProductToWishList,
        getProductFromWishlist,
      addProductToCart,
      getProductFromCart,
      getSingleProduct,
      removeSingleProductFromWishlist,
      removeSingleProductFromCart,
      getAllReivewsGiven
   }