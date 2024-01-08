import {combineReducers, legacy_createStore, applyMiddleware, compose} from "redux";
import {thunk} from "redux-thunk"
import { reducer as ProductReducer } from "./ProductReducer/reducer";
import {reducer as LoaderReducer} from "./LoaderReducer/reducer"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'



const rootReducer =  combineReducers({

       ProductReducer,
       LoaderReducer
})
const persistConfig = {
       key: 'persist-key',
       storage,
       whitelist: ['ProductReducer', 'LoaderReducer']
     }
 const persistedReducer = persistReducer(persistConfig, rootReducer)


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(persistedReducer,  composeEnhancers(applyMiddleware(thunk)) )
const persistor = persistStore(store)

export default store
export {persistor}



