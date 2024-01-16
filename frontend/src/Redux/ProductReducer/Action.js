
import apiService from "../../Config/apiService"
import {ActionTypes} from "./ActionTypes"



export const fetchTodayDealProducts =  () => {

   return async function (dispatch,getState) {
      const response = await apiService.get(`/products/products`)
  
      dispatch({
             type:ActionTypes.FETCH_TODAYS_DEAL_PRODUCTS,
             payload:response.data
         })
   }   
}


export const cartProducts = ()=>{
  

   return async function (dispatch) {
      const userId = localStorage.getItem("userId")
      const response = await apiService.get(`/products/cart/get_cartdata/${userId}`,
       ).catch((err)=>{
         console.log(err)
       });
         
         if(response){
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
}



export const wishlistProducts = ()=>{


   return async function (dispatch) {
      const userId = localStorage.getItem("userId")
      const response = await apiService.get(`/products/wishlist/get_products/${userId}`,
       ).catch((err)=>{
         console.log(err)
       });
   
      if(response){
        dispatch({
          type:ActionTypes.WISHLIST_PRODUCTS,
          payload:response.data.products
      })
      }
    
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

 export const  addCartdataTocartItemsAndCount = (payload) =>{
          console.log("atleast i am reaching here")
//    return async function (dispatch) {
//     const userId = localStorage.getItem("userId")
//     const response = await apiService.get(`/products/cart/get_cartdata/${userId}`,
//                                           ).catch((err)=>{
//                                             console.log(err)
                                         
//                                           });
     
   
//       if(response){
//         const productData = response.data.products
//         const newArray = productData.map(({ _id, name}) => ({
//           productId: _id,
//           count: 1,
//           productName:name,}));

//           console.log(newArray)
    
//         dispatch({
//           type:ActionTypes.ADD_CARTDATA_TO_CARTITMESANDCOUNT,
//           payload:newArray
//       })
//       }
  
    
//  }  
 return{
  type:ActionTypes.ADD_CARTDATA_TO_CARTITMESANDCOUNT,
  payload:payload
}
 }
export const incrementQuantity = (productId,incrementCount,name)=>{

    return{
      type:ActionTypes.INCREMENT_QUANTITY,
       payload:{productId,incrementCount,name}
    }
}

export const decrementQuantity = (productId,decrementCount,name)=>{
          
  return{
    type:ActionTypes.DECREMENT_QUANTITY,
     payload:{productId,decrementCount,name}
  }
}

export const deleteItemFromCartDataAndcount = (productId)=>{
         
return{
type:ActionTypes.DELETE_CARTITEMS_AND_COUNT,
payload:productId
}
}
