const {UserModel} = require("../models/usermodel") 
const {TokenBlacklist} = require("../models/blacklistmodel")
const {ProductModel} = require("../models/productmodel")
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
         const token = jwt.sign({userId:isUserPresent._id, username:isUserPresent.username, role:isUserPresent.role},process.env.secret)
     
         return res.status(200).json({"Message":"User Logged in Successfully",Token:token,Role:isUserPresent.role, userId:isUserPresent._id})
        
        
      } catch (error) {

        return res.status(500).json({"Message":"Failed to Authenticate","Error":error.message})
        
      }

}

const  logoutUser = async(req,res)=>{
  const token = req.headers.authorization?.split(" ")[1]

          try {
            
              const tokenEntry = new TokenBlacklist({token});
              await tokenEntry.save();
               res.status(200).json({"Message":"User has been Logout"})

          } catch (error) {
            return res.status(500).json({"Message":"Failed to Authenticate Token Blacklist","Error":error.message})
            
          }
          
}

const userReview = async (req,res)=>{
  const productId = req.params.id;
  const {userId, rating,reviewTitle, reviewData} = req.body

       try {
         
         const productTobeReview = await ProductModel.findOne({_id:productId})

          if(!productTobeReview){
            return res.status(400).json({"Message":error.message})
          }

         const userWhichIsReviewing = await UserModel.findOne({_id: userId}) 

         if(!userWhichIsReviewing){
          return res.status(400).json({"Message":error.message})
         }

          const checkProductIdInReviewModel = await  ReviewModel.findOne({product:productTobeReview})
          if(!checkProductIdInReviewModel){
              const productReivew = new ReviewModel({product:productId, reviews:[{user:userId, rating:rating, reviewTitle:reviewTitle, reviewData:reviewData}]})
              console.log(productReivew)
         await productReivew.save()
         return  res.status(200).send({"Message":"Product review added Successfully"})
          }

          const allReviewsdata = checkProductIdInReviewModel.reviews
          const isUseridAvailable = allReviewsdata.find((el)=>{
                      return el.user == userId
          })
          if(isUseridAvailable){
            return res.status(200).send({"Message":"User already Given the reviews you can edit only"})
          }

          // const checkUserIdInReviewModel = await ReviewModel.find

         const productReivew = new ReviewModel({product:productId, reviews:[{user:userId, rating:rating, reviewTitle:reviewTitle, reviewData:reviewData}]})
         console.log(productReivew)
         await productReivew.save()
         return  res.status(200).send({"Message":"Product review added Successfully"})
        
       } catch (error) {
        return res.status(400).json({"Message":error.message})
       }
}

module.exports = {registerUser, loginUser, userReview}