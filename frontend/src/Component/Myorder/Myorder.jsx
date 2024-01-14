import React from 'react'
import "./Myorder.css"
import axios from "axios"
import { useSelector } from 'react-redux'

function Myorder() {
  const ___cartProducts = (useSelector((state)=>{
    return state.ProductReducer.cartData
}))

const ___cartInitialPrice = (useSelector((state)=>{
     return state.ProductReducer.cartInitialPrice;    
}))
const ___cartDiscountedPrice = (useSelector((state)=>{
   return state.ProductReducer.cartDiscountedPrice
}))

const ___cartTotalPrice = (useSelector((state)=>{
  return state.ProductReducer.cartTotalPrice
}))

const __orderDetails = (useSelector((state)=>{
     return state.ProductReducer.cartItemsAndCount
}))
console.log(__orderDetails, "order details here")


const placeOrder = async()=>{

        try {
          const response1= await axios.get(`http://localhost:4500/api/payment/get_key`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("shopin-token")}`,
            }
          }
          )
        

          const apiKey = response1.data.apiKey
          console.log(apiKey, "hjekk apik key")
  
         const response = await axios.post(`http://localhost:4500/api/payment/accept_payment`,
         {
            userId: localStorage.getItem("userId"),
            amount: ___cartTotalPrice,
         },
         {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("shopin-token")}`,
          }
          // this data keyword is neccessary in axios when using delete method 
       
        })
        
        console.log(response, "heii this is the respone of data")


        const options = {
          key: apiKey, // Enter the Key ID generated from the Dashboard
          amount: ___cartTotalPrice, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "shopInn",
          description: "Test Transaction",
          image: "https://avatars.githubusercontent.com/u/80870870?v=4",
          order_id: response.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          callback_url:"http://localhost:4500/api/payment/payment_verification",
          redirect: true,
          prefill: {
              name: "Gaurav Kumar",
              email: "gaurav.kumar@example.com",
              contact: "9000090000"
          },
          notes: {
              address: "shopInn Corporate Office"
          },
          theme: {
              color: "#3399cc"
          }
      };
      const rzp1 = new  window.Razorpay(options);
       rzp1.open().then((response)=>{
         console.log(response)
       });
        } catch (error) {
          console.log(error)
        }     
}



  return (
    <div className='mo-main'>
               
               <div className="mo-title">
                 <h1>Order Details</h1>
               </div>
               <div className="mo-details">
                    <div>
                        <div className='iniq'>
                         <div>Item Name</div>
                          <div>Item Quantity</div>
                        </div>
                        
                            {__orderDetails.map((el)=>{
                                return(
                                  <div className='iniq'  key={el.productId}>
                              
                                    <div>{el.productName}</div>
                                    <div>{el.count}</div>
                             
                                </div>
                                )
                            })}
                       
                        <div className='iniq'>
                         <div>Price</div>
                          <div>Rs. {___cartInitialPrice}</div>
                        </div>
                        <div className='iniq'>
                         <div>Delivery Charges</div>
                          <div>Free</div>
                        </div>
                        <div className='iniq'>
                         <div>Discount</div>
                          <div>Rs. {___cartDiscountedPrice}</div>
                        </div>
                        <div className='iniq'>
                         <div>Total Amount</div>
                          <div>Rs. {___cartTotalPrice}</div>
                        </div>
                        <div className='iniq'>
                            <div>
                              Delivery Address
                            </div>
                        </div>
                        <div className='iniq'>
                        <div><button onClick={placeOrder}>Place order</button></div>
                        </div>
                    </div>                      
               </div>



    </div>
  )
}

export default Myorder