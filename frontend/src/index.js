import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './Context/AuthContext';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import Loader from './Component/Loader/Loader';
// import { showLoader,stopLoader } from './Redux/LoaderReducer/Action';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>

      <AuthContextProvider>
         <React.StrictMode>
         <ReactNotifications />
             <App />
         </React.StrictMode>
     </AuthContextProvider>

  </Provider>

);

