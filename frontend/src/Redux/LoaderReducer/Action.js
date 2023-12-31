import { ActionTypes } from "./ActionTypes";


export const showLoader  = () =>{

     return ({type: ActionTypes.START_LOADING })
}


export const stopLoader  = () =>{

    return ({type: ActionTypes.STOP_LOADING })
}

