const jwt = require("jsonwebtoken");
const {TokenBlacklist}= require("../models/blacklistmodel")
require("dotenv").config();

const auth = (req,res,next)=>{
 
    const token = req.headers.authorization.split(" ")[1];
   
    // const verifyToken = TokenBlacklist.findOne({token});

    //  if(verifyToken){
    //     console.log(verifyToken)
    //     return res.json({"Message":"Invalid Token"})
    //  }


    try {

        const decodeToken = jwt.verify(token, process.env.secret);
        // console.log(decodeToken);
        req.body.userId = decodeToken.userId;
        req.body.username = decodeToken.username;
        next();

        
    } catch (error) {
        
        return res.status(401).json({"Message":"Authentication Failed", "Error":error.message});

    }


}

const isAdmin = async(req,res,next)=>{
    console.log("hello is adimin")


        try {
            const token = req.headers.authorization.split(" ")[1];
            console.log(token)
            const decodeToken = jwt.verify(token, process.env.secret);
            console.log(decodeToken)

            if(decodeToken.role=="admin"){
                return next()
            }else{
                return res.status(401).json({"Message":"Authentication Failed", "Error":error.message});
            }
        } catch (error) {
            
            return res.status(500).json({"Message":"Internal Server Error"})
        }
}

module.exports ={auth, isAdmin}