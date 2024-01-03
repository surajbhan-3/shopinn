
import axios from "axios"
import {ActionTypes} from "./ActionTypes"



export const fetchTodayDealProducts =  () => {

   return async function (dispatch,getState) {
      const response = await axios.get(`http://localhost:4500/api/products/products`)
  
      dispatch({
             type:ActionTypes.FETCH_TODAYS_DEAL_PRODUCTS,
             payload:response.data
         })
   }   
}


export const cartProducts = ()=>{
  

   return async function (dispatch) {
      const userId = localStorage.getItem("userId")
      const response = await axios.get(
         `http://localhost:4500/api/products/cart/get_cartdata/${userId}`,
       
         {
           headers: {
             Authorization: `Bearer ${localStorage.getItem("shopin-token")}`,
           },
         }
       ).catch((err)=>{
         console.log(err)
       });
   
     
        dispatch({
          type:ActionTypes.CART_PRODUCTS,
          payload:response.data.products
      })
      
   }  
}



export const wishlistProducts = ()=>{


   return async function (dispatch) {
      const userId = localStorage.getItem("userId")
      const response = await axios.get(
         `http://localhost:4500/api/products/wishlist/get_products/${userId}`,
       
         {
           headers: {
             Authorization: `Bearer ${localStorage.getItem("shopin-token")}`,
           },
         }
       ).catch((err)=>{
         console.log(err)
       });
       console.log("hello from wishlist proudcts")
       console.log(response)

  
   
    
      dispatch({
        type:ActionTypes.WISHLIST_PRODUCTS,
        payload:response.data.products
    })
     
   } 

}


