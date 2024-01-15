const  express = require("express");
const adminRouter = express.Router()
const {isAdmin}= require("../middleware/authorization");
const {upload} = require("../middleware/multer.middleware")
const { getAllusers, addProduct, deleteProduct, updateProduct,  getProductsByCategory, singleProduct, updateProductImage, getDashboardCounts } = require("../controllers/adminController");



adminRouter.get("/alluser", isAdmin , getAllusers)
adminRouter.post("/add_product", isAdmin, upload.single('avtar'), addProduct)

adminRouter.post("/delete_product", isAdmin, deleteProduct)

adminRouter.patch("/update_product", isAdmin, updateProduct)
adminRouter.get("/products/:category", isAdmin, getProductsByCategory)
adminRouter.get("/product_details/:id", isAdmin, singleProduct)
adminRouter.patch("/update/product_image", isAdmin,  upload.single('avtar'), updateProductImage)
adminRouter.get("/dashboard/counts", isAdmin, getDashboardCounts)



module.exports = adminRouter