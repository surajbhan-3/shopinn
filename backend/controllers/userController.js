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

           return res.status(401).json({status:"failed",Message:"Authentication Failed"});
         }

         const isPasswordValid = await bcrypt.compare(password, isUserPresent.password);
         if(!isPasswordValid){

          return res.status(401).json({status:"failed",Message:"Authentication Failed"});

         }
            // console.log(isUserPresent)
         const token = jwt.sign({userId:isUserPresent._id, username:isUserPresent.username, role:isUserPresent.role},process.env.secret, {expiresIn:"7d"})
          
         return res.status(200).json({"Message":"User Logged in Successfully",Token:token,Role:isUserPresent.role, userId:isUserPresent._id, avtar:isUserPresent.avtar})
        
        
      } catch (error) {
         console.log(error.message)

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
              const userAddressDetails = await AddressModel.find({user:userId})
              const {username, avtar, email} = userPrimaryDetails
        
              return res.status(200).send({userData:{username:username, avtar:avtar, email:email},userSecondaryDetails, userAddressDetails})
             } catch (error) {
              
             }

}


const editUserProfileSettings = async(req,res)=>{
   const {firstname, lastname, gender, dateOfBirth} = req.body;
   const {userId} = req.body;
 
        try {
             const checkUserUpdateProfile = await UserUpdateModel.findOne({user:userId});
             console.log(checkUserUpdateProfile,"update profile")
      
              if(checkUserUpdateProfile === null ){
                console.log("hello")
                const updateUserData = new UserUpdateModel({user:userId,firstname,lastname,gender, dateOfBirth});
                console.log("hello", updateUserData)
                   await updateUserData.save()
                   return res.status(200).send({"Message":"data has been updated"})
              }else{

                  console.log("User profile already exists, performing update");
               
                  checkUserUpdateProfile.firstname = firstname;
                  checkUserUpdateProfile.lastname = lastname;
                  checkUserUpdateProfile.gender = gender;
                  checkUserUpdateProfile.dateOfBirth = dateOfBirth;
          
                  await checkUserUpdateProfile.save();
                  return res.status(200).send({ "Message": "Data has been updated" });
            
              }
        } catch (error) {
          console.log(error.message)
          return res.status(500).send({"Message":"Internal Server error",Error:error.message})
  
        }
}

const editUserAddressSettings = async(req,res)=>{
  const {address, city, postalCode, landmark} = req.body;
  const {userId} = req.body;

       try {
            const checkUserUpdateProfile = await AddressModel.findOne({user:userId});
            console.log(checkUserUpdateProfile,"update profile")
     
             if(checkUserUpdateProfile === null ){
               console.log("hello")
               const updateUserData = new AddressModel({user:userId,address, city, postalCode, landmark});
               console.log("hello", updateUserData)
                  await updateUserData.save()
                  return res.status(200).send({"Message":"data has been updated"})
             }else{

                 console.log("User profile already exists, performing update");
              
                 checkUserUpdateProfile.address = address;
                 checkUserUpdateProfile.city= city;
                 checkUserUpdateProfile.postalCode = postalCode;
                 checkUserUpdateProfile.landmark = landmark;
         
                 await checkUserUpdateProfile.save();
                 return res.status(200).send({ "Message": "Data has been updated coreecty" });
           
             }
       } catch (error) {
         console.log(error.message)
         return res.status(500).send({"Message":"Internal Server error",Error:error.message})
 
       }
}

const updateProfilePicture =  async (req, res) => {
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
  

  



       try {
         
        // *find product which is going to be reivewd with product id ,
         const productTobeReview = await ProductModel.findOne({_id:productId})
  
        //  if product not present return message
          if(!productTobeReview){
            return res.status(400).json({"Message":error.message})
          }
          // * finding user is present in a database
         const userWhichIsReviewing = await UserModel.findOne({_id: userId}) 
         // if user not present return message
         if(!userWhichIsReviewing){
          return res.status(400).json({"Message":error.message})
         }
         // * checking productId present in a reivewmodel
          const checkProductIdInReviewModel = await  ReviewModel.findOne({product:productTobeReview._id})
          // * if productId is not there means the product has no reivews. we can add new review
          if(!checkProductIdInReviewModel){
         
              const productReivew = new ReviewModel({product:productId, reviews:[{user:userId, rating:rating, reviewTitle:reviewTitle, reviewData:reviewText}]})
              
              console.log(productReivew, "hey product reivew")
               await productReivew.save()
              const checkProductIdInReviewModel = await  ReviewModel.findOne({product:productTobeReview._id})
               console.log(checkProductIdInReviewModel, "id newnwnenwe")
               const ratingArray = checkProductIdInReviewModel.reviews;
               const allRatings = ratingArray.map((el)=>{
                        return el.rating
               })
               const totalRating = allRatings.reduce((el,prev)=>{
                                  return el+prev
               },0)
               const averageRating = Math.floor(totalRating/allRatings.length)
               await ProductModel.findByIdAndUpdate({_id:productId},{rating:averageRating})
               console.log(averageRating, "average raating new new ")
               console.log(allRatings, "allRatings new wnewnew")
             return  res.status(200).send({"Message":"Product review added Successfully"})
          }
        // * storing the reviews array in allReviewsData because the reiviews array contians the userid ant ther review data
          const allReviewsdata = checkProductIdInReviewModel.reviews
          // checking is user present in reivew array of objects and each objects holds user reivew info
          const isUseridAvailable = allReviewsdata.find((el)=>{
                      return el.user == userId
          })
         //*if user already given riview , will not be able to do so again
          if(isUseridAvailable){
            return res.status(200).send({"Message":"User already Given the reviews you can edit only"})
          }

        checkProductIdInReviewModel.reviews.push({user:userId, rating:rating, reviewTitle:reviewTitle, reviewData:reviewText} );
          await  checkProductIdInReviewModel.save()
        
        //  return  res.status(200).send({"Message":"Product review added Successfully"})
      
        // console.log(checkProductIdInReviewModel.reviews, "review model")
        const ratingArray = checkProductIdInReviewModel.reviews;
        const allRatings = ratingArray.map((el)=>{
                 return el.rating
        })
        const totalRating = allRatings.reduce((el,prev)=>{
                           return el+prev
        },0)
        const averageRating = Math.floor(totalRating/allRatings.length)
        await ProductModel.findByIdAndUpdate({_id:productId},{rating:averageRating})
        console.log(averageRating, "average raating")
        console.log(allRatings, "allRatings")
        return  res.status(200).send({"Message":"Product review added Successfully"})
       } catch (error) {
        return res.status(400).json({"Message":error.message})
       }


}






         



module.exports = {
  registerUser, 
  loginUser,
  logoutUser, 
  userSettings, 
  addUserReview,
 updateProfilePicture,
 editUserProfileSettings,
 editUserAddressSettings
}