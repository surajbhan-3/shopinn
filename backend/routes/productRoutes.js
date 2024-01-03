const  express = require("express");
const productRouter = express.Router()
const {auth, isAdmin}= require("../middleware/authorization")
const {addProduct, getProduct, deleteProduct, updateProduct, addProductToWishList, getProductFromWishlist, addProductToCart, getProductFromCart, getSingleProduct, removeSingleProductFromWishlist, removeSingleProductFromCart, getAllReivewsGiven} = require("../controllers/productController")


productRouter.get("/products",getProduct)
productRouter.get("/product_details/:id", getSingleProduct)

productRouter.post("/add_product", isAdmin, addProduct)

productRouter.post("/delete_product", isAdmin, deleteProduct)

productRouter.post("/update_product", isAdmin, updateProduct)
productRouter.post("/wishlist/add_product", auth, addProductToWishList)
productRouter.get("/wishlist/get_products/:userId",auth, getProductFromWishlist)
productRouter.delete("/wishlist/remove_product/:id", auth, removeSingleProductFromWishlist)
productRouter.post("/cart/add_to_cart",auth,addProductToCart)
productRouter.get("/cart/get_cartdata/:id", auth, getProductFromCart)
productRouter.delete("/cart/remove_cart_items/:id", auth, removeSingleProductFromCart)
productRouter.get("/reviews/get_all_reviews", auth, getAllReivewsGiven)



module.exports = productRouter;
