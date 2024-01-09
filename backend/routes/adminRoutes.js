const  express = require("express");
const adminRouter = express.Router()
const {isAdmin}= require("../middleware/authorization");
const { getAllusers, addProduct, deleteProduct, updateProduct } = require("../controllers/adminController");



adminRouter.get("/alluser", isAdmin , getAllusers)
adminRouter.post("/add_product", isAdmin, addProduct)

adminRouter.post("/delete_product", isAdmin, deleteProduct)

adminRouter.post("/update_product", isAdmin, updateProduct)


module.exports = adminRouter