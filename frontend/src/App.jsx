import "./App.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Home from "../src/Pages/Home/Home";
import {  Routes, Route } from "react-router-dom";
import About from "./Pages/About/About";
import Navbar from "./Component/Navbar/Navbar";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Footer from "./Component/Footer/Footer";
import Offer from "./Component/Offer/Offer";
import Profile from "./Component/Profile/Profile";
import Myorder from "./Component/Myorder/Myorder";
import Wishlist from "./Pages/Wishlist/Wishlist";
import Cart from "./Pages/Cart/Cart";
import Product from "./Pages/Product/Product";
import Loader from "./Component/Loader/Loader";
import { showLoader, stopLoader } from "./Redux/LoaderReducer/Action";
import Category from "./Component/Category/Category";
import Books from "./Pages/Books/Books";
import Shoes from  "./Pages/Shoes/Shoes"
import Mobile from "./Pages/Mobile/Mobile"
import Reviews from "./Pages/Reviews/Reviews";
import AdminNavbar from "./Admin/Components/Adminnavbar/Adminnavbar"
import Dashboard from "./Admin/Pages/Dashboard/Dashboard";
import Privateroute from "./Component/Private/Privateroute";
import Mypurchase from "./Pages/Mypurchase/Mypurchase";
import Addproduct from "./Admin/Pages/Addproducts/Addproduct";
import Productupdate from "./Admin/Pages/Productupdate/Productupdate";




function App() {
  const isLoading = useSelector((state) => state.LoaderReducer.isLoading);
  const dispatch = useDispatch()


useEffect(() => {
    // Show loader when component mounts
    dispatch(showLoader());

    // Hide loader after 2 seconds (simulating loading time)
    const timer = setTimeout(() => {
      dispatch(stopLoader());
    }, 2000);

    return () => clearTimeout(timer); // Clear the timeout on unmount
  }, [dispatch]);

  return (
    // moved my `Browserrouter` to index.js file  because you cannot use useNavigate inside authprovider file
    // because  useNavigate should be wrapped within Router component
    <React.Fragment>
        {isLoading ? <Loader /> :
            <Routes>
              <Route path="/about" element={<About />} />
            

              <Route path="/"        element={ <React.Fragment> <Offer /> <Navbar /> <Home /> <Category /> <Footer /> </React.Fragment> } />
              <Route path="/mobiles" element={ <React.Fragment> <Offer /> <Navbar /> <Mobile /> <Footer/> </React.Fragment> } />
              <Route path="/shoes"   element={ <React.Fragment> <Offer /> <Navbar /> <Shoes /> <Footer/> </React.Fragment> } />
              <Route path="/books"   element={ <React.Fragment> <Offer /> <Navbar /> <Books /> <Footer/> </React.Fragment> } />


              <Route path="/product" element={ <React.Fragment> <Offer /> <Navbar />  <Product /> <Footer/> </React.Fragment>} />
              <Route path="/signup"  element={ <React.Fragment> <Offer /> <Navbar class="snav" hideElements={true} /> <Signup /> </React.Fragment> } />
              <Route path="/login"   element={ <React.Fragment> <Offer /> <Navbar class="snav" hideElements={true} /> <Login />  </React.Fragment> } />

              <Route element={<Privateroute />}>
                    {/* Protected routes */}
                <Route path="/wishlist"            element={ <React.Fragment> <Offer /> <Navbar /> <Wishlist /> <Footer/> </React.Fragment> } />
                <Route path="/cart"                element={ <React.Fragment> <Offer /> <Navbar /> <Cart     /> <Footer/> </React.Fragment> } />
                <Route path="/settings"            element={ <React.Fragment> <Offer /> <Navbar /> <Profile  /> <Footer/> </React.Fragment> } />
                <Route path="/my_order"            element={ <React.Fragment> <Offer /> <Navbar /> <Myorder  /> <Footer/> </React.Fragment> } />
                <Route path="/my_purchase"         element={ <React.Fragment> <Offer /> <Navbar /> <Mypurchase/> <Footer/> </React.Fragment> } />
                <Route path="/reviews_given"       element={ <React.Fragment> <Offer /> <Navbar /> <Reviews  /> <Footer/> </React.Fragment> } />
              
                <Route path="/admin"               element={ <React.Fragment> <AdminNavbar /> <Dashboard /> </React.Fragment> } />
                <Route path="/admin/add_products"  element={ <React.Fragment> <AdminNavbar /> <Addproduct /> </React.Fragment> } />
                <Route path="/admin/product_changes"  element={ <React.Fragment> <AdminNavbar /> <Productupdate /> </React.Fragment> } />
            
              </Route>   {/* Private or Protected routes ends here */}


            </Routes>}
    </React.Fragment>
  );
}

export default App;
