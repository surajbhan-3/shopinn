const express = require("express");
const Razorpay = require("razorpay")
const { connection } = require("./config/db");
const cors = require("cors")
require("dotenv").config();
const Port = process.env.PORT;

const corsOptions = {
  origin: ['http://localhost:3000', 'https://shopinn-red.vercel.app'], // Allowed origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',               // Allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization',            // Allowed headers in preflight requests
  exposedHeaders: ['Content-Length', 'Authorization'],    // Headers to expose to the browser
  credentials: true,                                       // Allow credentials (e.g., cookies)
  maxAge: 3600,                                            // Cache preflight requests for 1 hour
  preflightContinue: false,                                // Don't continue processing if CORS checks fail
  optionsSuccessStatus: 204,                               // HTTP status code for successful preflight requests
};

// Use cors middleware with the configured options
app.use(cors(corsOptions));


const app = express();
app.use(express.json())
app.use(cors(corsOptions))


 const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});
module.exports ={instance}
const userRoutes =require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const paymentRouter = require("./routes/paymentRoutes");
const adminRouter = require("./routes/adminRoutes");


app.get("/", async(req, res)=>{

         try {

          res.status(200).json({"Message":"Welcome to backend shopin project"})
          
         } catch (error) {
               
          res.status(500).json({"Message":"Internal Server Error"})
          
         }
})




app.use("/api/user",userRoutes)
app.use("/api/products", productRouter)
app.use("/api/payment", paymentRouter)
app.use("/api/admin", adminRouter)


app.listen(Port, async () => {
  try {
    await connection;
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is rnning at ${Port}`);
});
