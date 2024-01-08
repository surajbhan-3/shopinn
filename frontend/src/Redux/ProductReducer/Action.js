
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

    const cartPrice = response.data.products;

    const initialCartPrice = cartPrice.reduce((acc, el)=>{
           return   acc+el.price   
    },0)
   const discountedPrice = Math.floor(initialCartPrice*(5/100))
   const totalPrice = initialCartPrice-discountedPrice
   console.log(discountedPrice, "dsocountprice")
      dispatch({
        type:ActionTypes.CART_PRODUCTS_PRICE,
        payload:initialCartPrice
      })
      dispatch({
        type:ActionTypes.DISCOUNTED_PRICE,
        payload:discountedPrice
      })
      dispatch({
        type:ActionTypes.TOTAL_CART_PRICE,
        payload:totalPrice
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

export const incrementCartData = (cartInitialPrice, cartDiscountedPrice, cartTotalPrice)=>{
       return {
        type:ActionTypes.INCREMENT_CART_DATA,
        payload:{cartInitialPrice, cartDiscountedPrice, cartTotalPrice}
       }
        
}
export const decrementCartData = (cartInitialPrice, cartDiscountedPrice, cartTotalPrice)=>{
       
  return {
   type:ActionTypes.DECREMENT_CART_DATA,
   payload:{cartInitialPrice, cartDiscountedPrice, cartTotalPrice}
  }
   
}


export const incrementQuantity = (productId,incrementCount,name)=>{
  console.log("he action.js, ", productId)
    return{
      type:ActionTypes.INCREMENT_QUANTITY,
       payload:{productId,incrementCount,name}
    }
}

export const decrementQuantity = (productId,decrementCount,name)=>{
           console.log(productId, decrementCount, "hiiiiiiiii")
  return{
    type:ActionTypes.DECREMENT_QUANTITY,
     payload:{productId,decrementCount,name}
  }
}
