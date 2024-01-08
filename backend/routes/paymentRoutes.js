const  express = require("express");
const paymentRouter = express.Router()
const {auth, isAdmin}= require("../middleware/authorization");
const { acceptPayment, paymentVerification, getRazorpayKey } = require("../controllers/paymentController");

paymentRouter.get("/get_key",auth,getRazorpayKey)
paymentRouter.post("/accept_payment",auth,acceptPayment)
paymentRouter.post("/payment_verification",  paymentVerification)

module.exports = paymentRouter;

