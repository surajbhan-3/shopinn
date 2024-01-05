const {UserModel} = require("../models/usermodel") 
const {TokenBlacklist} = require("../models/blacklistmodel")
const {ProductModel} = require("../models/productmodel")
const {UserUpdateModel} = require("../models/userUpdatemodel")
const {AddressModel} = require("../models/addressmodel")
const {uploadImageToCloudinary} = require("../utils/cloudinary")





const bcrypt = require("bcrypt")
require("dotenv").config()
const jwt = require("jsonwebtoken");
const { ReviewModel } = require("../models/reviewmodel")

const saltRounds=Number(process.env.salt_rounds)





const  registerUser = async(req,res)=>{

    const {username,email,password, firstname, lastname,role} = req.body;

           try {

              const userAlreadyExist =  await UserModel.findOne({email:email})
                  if(userAlreadyExist){
                    return res.status(200).json({"Message":"User already Register, Please Login"})
                  }
                  const hashPassword = await bcrypt.hash(password,saltRounds);
                

                  const addUser = new UserModel({username, email, password:hashPassword, firstname,lastname,role})

                                   await addUser.save()
                     
                   return res.status(201).json({"Message":`${username} Registered Successfully`})                
            
           } catch (error) {
            
                    return res.status(400).json({"Message":error.message})

           }
}


const loginUser = async(req,res)=>{
const  {email, password} = req.body;
console.log(email, password, "ehllo")

      try {
        const isUserPresent = await UserModel.findOne({email});
        
         if(!isUserPresent){

           return res.status(401).json({"Message":"Authentication Failed"});
         }

         const isPasswordValid = await bcrypt.compare(password, isUserPresent.password);
         if(!isPasswordValid){

          return res.status(401).json({"Message":"Authentication Failed"});

         }
            // console.log(isUserPresent)
         const token = jwt.sign({userId:isUserPresent._id, username:isUserPresent.username, role:isUserPresent.role},process.env.secret, {expiresIn:"7d"})
          
         return res.status(200).json({"Message":"User Logged in Successfully",Token:token,Role:isUserPresent.role, userId:isUserPresent._id, avtar:isUserPresent.avtar})
        
        
      } catch (error) {

        return res.status(500).json({"Message":"Failed to Authenticate","Error":error.message})
        
      }

}

const  logoutUser = async(req,res)=>{
  const token = req.headers.authorization?.split(" ")[1]
        
          try {
  
              const tokenEntry = new TokenBlacklist({token:token});
              await tokenEntry.save();
              console.log("data saved")
             return res.status(200).send({"Message":"User has been Logout"})

          } catch (error) {
             console.log(error.message, "this is erro .mesag")
            return res.status(500).json({"Message":"Failed to Authenticate Token Blacklist","Error":error.message})
            
          }
          

}


const userSettings = async(req,res) =>{
           const {userId} = req.body;

             try {
              const userPrimaryDetails = await UserModel.findOne({_id:userId})
              const userSecondaryDetails  = await UserUpdateModel.find({user:userId})
              const userAddressDetails = await AddressModel.find({User:userId})
              const {username, avtar, email} = userPrimaryDetails
              console.log(userPrimaryDetails)
              console.log(userSecondaryDetails)
              return res.status(200).send({userData:{username:username, avtar:avtar, email:email},userSecondaryDetails, userAddressDetails})
             } catch (error) {
              
             }

}


const editUserSettings = async(req,res)=>{

        try {
          
        } catch (error) {
          
        }
}

const updateProfilePicture =  async (req, res) => {
  console.log("Updating profile picture");
  const userId  = req.params.id;

  try {
    // Find the user by ID
    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

       console.log(req.file, "this is req.file")
       const avtarFilePath = req.file.path     
              console.log(avtarFilePath, "avtarfilepateh")
        const avatar =   await uploadImageToCloudinary(avtarFilePath) 
        console.log(avatar.url)
       user.avtar = avatar.url;
    await user.save();
        console.log("userImage added")
    res.status(200).json({ message: 'Profile picture updated successfully', url: result.secure_url });
  } catch (error) {
    res.status(500).json({ Message: 'Failed to update profile picture', Error:error.message });
  }
};




const addUserReview = async (req,res)=>{
  const productId = req.params.id;
  
  const {reviewTitle,rating, reviewText} = req.body.finalReviewDataFromUser;
  const {userId} = req.body
  
 
  console.log(req.body)
  
  console.log(userId,rating,reviewTitle, reviewText , "jhsdfsdf")


       try {
         
         const productTobeReview = await ProductModel.findOne({_id:productId})
         console.log(productTobeReview._id, "tobe  review")

          if(!productTobeReview){
            return res.status(400).json({"Message":error.message})
          }
         const userWhichIsReviewing = await UserModel.findOne({_id: userId}) 
         if(!userWhichIsReviewing){
          return res.status(400).json({"Message":error.message})
         }
          const checkProductIdInReviewModel = await  ReviewModel.findOne({product:productTobeReview._id})
           console.log(checkProductIdInReviewModel, "this is product in review asd")
          if(!checkProductIdInReviewModel){
         
            console.log("Hey i am able to reach here")
              const productReivew = new ReviewModel({product:productId, reviews:[{user:userId, rating:rating, reviewTitle:reviewTitle, reviewData:reviewText}]})
                   console.log(productReivew)
              await productReivew.save()
         return  res.status(200).send({"Message":"Product review added Successfully"})
          }

          const allReviewsdata = checkProductIdInReviewModel.reviews
          console.log(allReviewsdata, "all reviewsdata")
          console.log(userId,"this is userId")
          const isUseridAvailable = allReviewsdata.find((el)=>{
                      return el.user == userId
          })
          console.log(isUseridAvailable, "sifsdaf auad")
          if(isUseridAvailable){
            return res.status(200).send({"Message":"User already Given the reviews you can edit only"})
          }

        checkProductIdInReviewModel.reviews.push({user:userId, rating:rating, reviewTitle:reviewTitle, reviewData:reviewText} );
              await  checkProductIdInReviewModel.save()
        
         return  res.status(200).send({"Message":"Product review added Successfully"})
        
       } catch (error) {
        return res.status(400).json({"Message":error.message})
       }

}






         



module.exports = {registerUser, loginUser,logoutUser, userSettings, addUserReview, updateProfilePicture}