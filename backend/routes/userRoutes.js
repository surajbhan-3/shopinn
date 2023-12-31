const  express = require("express");
const router = express.Router()
const {auth}= require("../middleware/authorization")
const {registerUser, loginUser, userReview} = require("../controllers/userController")


// Route for  user registration

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/product/review/:id",auth, userReview)



module.exports = router