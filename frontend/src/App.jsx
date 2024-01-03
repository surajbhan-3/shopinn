import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Home from "../src/Pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Reviews from "./Pages/Reviews/Reviews";
import AdminNavbar from "./Pages/Admin/Adminnavbar/Adminnavbar";
import Dashboard from "./Pages/Admin/Pages/Dashboard/Dashboard";





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
    
    <BrowserRouter>
      {isLoading ? <Loader />:
      <Routes>
      <Route
         path="/"
         element={
           <>
             <Offer />
             <Navbar   />
             <Home />
             <Category />
             <Footer />
           </>
         }
       />
       <Route path="/about" element={<About />} />
       <Route
         path="/signup"
         element={
           <>
             <Navbar class="snav" hideElements={true} />
             <Signup />
           </>
         }
       />
       
       <Route path="/login" element={<Login />} />
       
          <Route
         path="/settings"
         element={
           <>
             <Offer />
             <Navbar   />
             <Profile />
             <Footer/>
           </>
         }
       />

<Route
         path="/reviews_given"
         element={
           <>
             <Offer />
             <Navbar   />
             <Reviews />
             <Footer/>
           </>
         }
       />




        <Route
         path="/my_order"
         element={
           <>
             <Offer />
             <Navbar   />
             <Myorder />
             <Footer/>
           </>
         }
       />

<Route path="/mobiles" element={
 <>
  <Offer />
  <Navbar /> 
 <Footer/>
 </>
} />


<Route path="/shoes" element={
 <>
  <Offer />
  <Navbar /> 
 <Footer/>
 </>
} />

<Route path="/books" element={
 <>
  <Offer />
  <Navbar /> 
 <Footer/>
 </>
} />


<Route path="/wishlist" element={
 <>
  <Offer />
  <Navbar /> 
 <Wishlist />
 <Footer/>
 </>
} />
<Route path="/cart" element={
 <>
  <Offer />
  <Navbar /> 
 <Cart />
 <Footer/>
 </>
} />
<Route path="/product" element={
 <>
  <Offer />
  <Navbar /> 
 <Product />
 <Footer/>
 </>
} />


<Route path="/admin" element={
 <>
 <AdminNavbar />
 <Dashboard />

 </>
} />


     </Routes>}
    </BrowserRouter>
  );
}

export default App;
