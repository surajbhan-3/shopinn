const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors")
require("dotenv").config();
const Port = process.env.PORT;




const app = express();
app.use(express.json())
app.use(cors())
const userRoutes =require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");


app.get("/", async(req, res)=>{

         try {

          res.status(200).json({"Message":"Welcome to backend shopin project"})
          
         } catch (error) {
               
          res.status(500).json({"Message":"Internal Server Error"})
          
         }
})


app.use("/api/user",userRoutes)
app.use("/api/products", productRouter)

app.listen(Port, async () => {
  try {
    await connection;
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is rnning at ${Port}`);
});
