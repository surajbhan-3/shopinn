const  express = require("express");
const router = express.Router()
const {auth}= require("../middleware/authorization")
const {upload} = require("../middleware/multer.middleware")
const {registerUser, loginUser,  addUserReview, userSettings, updateProfilePicture, logoutUser} = require("../controllers/userController")


// Route for  user registration

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", auth, logoutUser)
router.post("/products/review/:id",auth, addUserReview)
router.get("/settings",auth, userSettings)
router.post("/profile_picture/:id", auth, upload.single('avtar'), updateProfilePicture)
// this uplad is coming from multer middleware





module.exports = router