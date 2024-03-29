import React from 'react'
import "./Myorder.css"
import axios from "axios"
import { useSelector } from 'react-redux'
import apiService from '../../Config/apiService'
import { AUTH_BASE_URL } from '../../Config/apiConfig'

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



const placeOrder = async()=>{

        try {
          const response1= await apiService.get(`/payment/get_key`)
        

          const apiKey = response1.data.apiKey
     
  
         const response = await apiService.post(`/payment/accept_payment`,
         {
            userId: localStorage.getItem("userId"),
            amount: ___cartTotalPrice,
         })
        
    

        const options = {
          key: apiKey, // Enter the Key ID generated from the Dashboard
          amount: ___cartTotalPrice, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "shopInn",
          description: "Test Transaction",
          image: "https://avatars.githubusercontent.com/u/80870870?v=4",
          order_id: response.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          callback_url:`${AUTH_BASE_URL}/api/payment/payment_verification`,
          redirect: true,
          prefill: {
              name: `${localStorage.getItem("shopin-username")}`,
              email: `${localStorage.getItem("email")}`,
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