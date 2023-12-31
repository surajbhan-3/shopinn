import { ActionTypes } from "./ActionTypes"

const initialState ={
       isLoading:false,
}



export const reducer =  (state = initialState, action) =>{

    switch(action.type){

        case ActionTypes.START_LOADING : {
            return {
                ...state,  isLoading:true
            }
        }

        case ActionTypes.STOP_LOADING :{
            return {
                ...state, isLoading: false,
            }
        }
        default: {
            return state
        }
            
    }
          
}