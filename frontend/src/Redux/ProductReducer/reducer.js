import { ActionTypes } from "./ActionTypes";

const intialState = {
  dealsData: [],
  wishlistData:[],
  cartData:[]
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
    default:
      return state;
  }
};
