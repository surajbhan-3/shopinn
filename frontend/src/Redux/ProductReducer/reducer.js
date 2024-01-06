import { ActionTypes } from "./ActionTypes";

const intialState = {
  dealsData: [],
  wishlistData:[],
  cartData:[],
  cartInitialPrice:0,
  cartDiscountedPrice:0,
  cartTotalPrice:0,
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
    default:
      return state;
  }
};
