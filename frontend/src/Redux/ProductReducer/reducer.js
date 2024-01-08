import { ActionTypes } from "./ActionTypes";

const intialState = {
  dealsData: [],
  wishlistData:[],
  cartData:[],
  cartInitialPrice:0,
  cartDiscountedPrice:0,
  cartTotalPrice:0,
  cartItemsAndCount:[]
};
export const reducer = (state = intialState, { type, payload }) => {
  switch (type) {
    
    case ActionTypes.FETCH_TODAYS_DEAL_PRODUCTS:{
      return{ ...state, dealsData:payload}
    }
    case ActionTypes.WISHLIST_PRODUCTS:{
      return {...state, wishlistData:payload}
    }
    case ActionTypes.CART_PRODUCTS:{
      return {
        ...state, cartData:payload
      }
    }
    case ActionTypes.CART_PRODUCTS_PRICE:{
      return {
        ...state, cartInitialPrice:payload
      }
    }
    case ActionTypes.DISCOUNTED_PRICE:{
      return {
        ...state, cartDiscountedPrice:payload
      }
    }
    case ActionTypes.TOTAL_CART_PRICE:{
      return {
        ...state, cartTotalPrice:payload
      }
    }
    case ActionTypes.INCREMENT_CART_DATA:{
      return {
        ...state, cartInitialPrice:payload.cartInitialPrice, 
        cartDiscountedPrice:payload.cartDiscountedPrice, cartTotalPrice:payload.cartTotalPrice
      }
    }
    case ActionTypes.DECREMENT_CART_DATA:{
       return {
        ...state, cartInitialPrice:payload.cartInitialPrice, 
        cartDiscountedPrice:payload.cartDiscountedPrice, cartTotalPrice:payload.cartTotalPrice
       }
    }
    case ActionTypes.INCREMENT_QUANTITY:{
         let itemCountUpdate;
            if(state.cartItemsAndCount.length===0){
               state.cartItemsAndCount.push({productId:payload.productId, count:payload.incrementCount, productName:payload.name})
               itemCountUpdate =[...state.cartItemsAndCount]
            }
            const geItemIndex  = state.cartItemsAndCount.findIndex((el)=>{
                 
                        return el.productId === payload.productId
            })
             if(geItemIndex!==-1){
              const data = state.cartItemsAndCount.map((el)=>{
                if(el.productId===payload.productId){
                  el.count = payload.incrementCount
                }
                return el;
                 })
                 itemCountUpdate = [...data]
             }else{
              const data = state.cartItemsAndCount.push({productId:payload.productId, count:payload.incrementCount, productName:payload.name})
              itemCountUpdate = [...data]
             }
            console.log(payload, 'hii this is payload')
        return{
          ...state, cartItemsAndCount: itemCountUpdate
        }
    }
    case ActionTypes.DECREMENT_QUANTITY:{
      
        
        
             console.log(payload,'hit this is payload payload')
           const itemCountUpdate = state.cartItemsAndCount.map((el)=>{
             if(el.productId===payload.productId){
                return {
                  ...el, count:payload.decrementCount
                }
             }
             return el;
              })
            console.log(itemCountUpdate, "itemcountupdaet")
         
         console.log(payload, 'hii this is payload')
     return{
       ...state, cartItemsAndCount: itemCountUpdate
     }
 }
    default:
      return state;
  }
};
