const  express = require("express");
const adminRouter = express.Router()
const {isAdmin}= require("../middleware/authorization");
const {upload} = require("../middleware/multer.middleware")
const { getAllusers, addProduct, deleteProduct, updateProduct,  getProductsByCategory } = require("../controllers/adminController");



adminRouter.get("/alluser", isAdmin , getAllusers)
adminRouter.post("/add_product", isAdmin, upload.single('avtar'), addProduct)

adminRouter.post("/delete_product", isAdmin, deleteProduct)

adminRouter.post("/update_product", isAdmin, updateProduct)
adminRouter.get("/products/:category", isAdmin, getProductsByCategory)



module.exports = adminRouter