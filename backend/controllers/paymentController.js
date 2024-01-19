const { instance } = require("../index.js")
require("dotenv").config();

const getRazorpayKey = async(req,res)=>{
     try {
        res.status(200).send({apiKey:process.env.RAZORPAY_API_KEY}) 
     } catch (error) {
        res.send(error)
     }
}


const acceptPayment = async (req,res)=>{
    const {amount} = req.body 
        try {

                const options = {
                amount: Number(amount*100),  // amount in the smallest currency unit
                currency: "INR",
                // receipt: "order_rcptid_11"
                };
          const order = await instance.orders.create(options);
          console.log(order)
          res.status(200).send(order)
                                
          } catch (error) {
                
                console.log(error)
             }
}


const paymentVerification = async(req,res)=>{
const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;

     try {
        console.log(req.body,"getting data")
    //  const   generated_signature = hmac_sha256(razorpay_order_id + "|" + razorpay_payment_id, process.env.RAZORPAY_SECRET_KEY)
     
    //       console.log(generated_signature, razorpay_signature)
    //  if (generated_signature == razorpay_signature) {
         return res.send({Message:"Payment successsfull"})
    //   }
     } catch (error) {
        return res.send(error)
     }
}



module.exports = {acceptPayment, paymentVerification, getRazorpayKey}


