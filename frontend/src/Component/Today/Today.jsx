import React from "react";
import { useEffect,useContext } from "react";
import { FaRegHeart } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import { ProductContext } from "../../Context/ProductContext";
import { useDispatch, useSelector } from "react-redux";
import {  fetchTodayDealProducts } from "../../Redux/ProductReducer/Action";
import { wishlistProducts } from "../../Redux/ProductReducer/Action";
import { cartProducts } from "../../Redux/ProductReducer/Action";




import "./Today.css";

function Today() {
  const { isLoggedIn } = useContext(AuthContext);

  const {handleAddProductToWishlist, handleSingleProductPage} = useContext(ProductContext)

  const __todaysDealProducts = useSelector((state) => {
    return state.ProductReducer.dealsData;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodayDealProducts())
    

    if (isLoggedIn) {
      dispatch(wishlistProducts());
      dispatch(cartProducts());
    }

  }, [dispatch, isLoggedIn]);


  return (
    <div className="today-section">
      {__todaysDealProducts.map((products) => {
        return (
          <div className="t-inner-card" key={products._id} >
            <div id="t-image-div" onClick={ ()=> handleSingleProductPage(products._id)}>
              <img src={products.imageUrl} alt="" />
            </div>
            <div id="t-brand" onClick={ ()=> handleSingleProductPage(products._id)}>
              <span>{products.name}</span>
            </div>
            <div id="t-price" onClick={ ()=> handleSingleProductPage(products._id)}>
              <span>Rs. {products.price}</span>
            </div>
            <div id="t-rating" onClick={ ()=> handleSingleProductPage(products._id)}>
            {
                         products.rating===5?<div>☆☆☆☆☆</div>:products.rating===4?<div>☆☆☆☆</div>:products.rating===3?<div>☆☆☆</div>
                         :products.rating===2?<div>☆☆</div>:products.rating===1?<div>☆</div>:null
                         
                         } 
            </div>
            <div className="wishlist-t">
              <button onClick={() => handleAddProductToWishlist(products._id)}>
                <span>Wishlist </span> <FaRegHeart id="fahert" />
              </button>
            </div>
          </div>
        );
      })}
        
    </div>
  );
}

export default Today;
