import {combineReducers, legacy_createStore, applyMiddleware, compose} from "redux";
import {thunk} from "redux-thunk"
import { reducer as ProductReducer } from "./ProductReducer/reducer";
import {reducer as LoaderReducer} from "./LoaderReducer/reducer"



const rootReducer =  combineReducers({

       ProductReducer,
       LoaderReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(rootReducer,  composeEnhancers(applyMiddleware(thunk)) )

export default store