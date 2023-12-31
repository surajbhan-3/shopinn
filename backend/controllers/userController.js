const {UserModel} = require("../models/usermodel") 
const {TokenBlacklist} = require("../models/blacklistmodel")
const bcrypt = require("bcrypt")
require("dotenv").config()
const jwt = require("jsonwebtoken");

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
  const {rating, reviewData} = req.body
       try {

         
        
       } catch (error) {
        
       }
}

module.exports = {registerUser, loginUser, userReview}