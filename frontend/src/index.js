import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './Context/AuthContext';
import { ProductContextProvider } from './Context/ProductContext';
import { Provider } from 'react-redux';
import store, {persistor} from './Redux/Store';
import Loader from './Component/Loader/Loader';
import { BrowserRouter } from "react-router-dom";

// import { showLoader,stopLoader } from './Redux/LoaderReducer/Action';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
<PersistGate  persistor={persistor}>
      <BrowserRouter>
      <AuthContextProvider>
      <ProductContextProvider>
         <React.StrictMode>
         <ReactNotifications />
             <App />
         </React.StrictMode>
         </ProductContextProvider>
     </AuthContextProvider>
     </BrowserRouter>
 </PersistGate>   

  </Provider>

);

