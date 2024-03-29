const  express = require("express");
const productRouter = express.Router()
const {auth}= require("../middleware/authorization")
const { getProduct,  addProductToWishList, getProductFromWishlist, addProductToCart, getProductFromCart, getSingleProduct, removeSingleProductFromWishlist, removeSingleProductFromCart, getAllReivewsGiven, saveOrderDetails, getPurchaseItems, deleteReview, getProductsByCategory, getProductsBySubCategory} = require("../controllers/productController")


productRouter.get("/products",getProduct)
productRouter.get("/product_details/:id", getSingleProduct)
productRouter.get("/category/:category/page/:pagenumber", getProductsByCategory)
productRouter.get("/category/:category/subcategory/:subcategory/page/:pagenumber", getProductsBySubCategory)
productRouter.post("/wishlist/add_product", auth, addProductToWishList)
productRouter.get("/wishlist/get_products/:userId",auth, getProductFromWishlist)
productRouter.delete("/wishlist/remove_product/:id", auth, removeSingleProductFromWishlist)
productRouter.post("/cart/add_to_cart",auth,addProductToCart)
productRouter.get("/cart/get_cartdata/:id", auth, getProductFromCart)
productRouter.delete("/cart/remove_cart_items/:id", auth, removeSingleProductFromCart)
productRouter.get("/reviews/get_all_reviews", auth, getAllReivewsGiven)
productRouter.delete("/reviews/delete_reveiw", auth, deleteReview)
productRouter.post("/order_details", auth, saveOrderDetails)
productRouter.get("/purchase_items",auth, getPurchaseItems)



module.exports = productRouter;
