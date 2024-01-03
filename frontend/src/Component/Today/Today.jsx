import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { FaRegHeart } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import {  fetchTodayDealProducts } from "../../Redux/ProductReducer/Action";
import { wishlistProducts } from "../../Redux/ProductReducer/Action";
import { cartProducts } from "../../Redux/ProductReducer/Action";
import { Store } from 'react-notifications-component';

import axios from "axios";

import "./Today.css";

function Today() {
  const { isLoggedIn } = useContext(AuthContext);

  const __todaysDealProducts = useSelector((state) => {
    return state.ProductReducer.dealsData;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTodayDealProducts())
    

    if (isLoggedIn) {
      dispatch(wishlistProducts());
      dispatch(cartProducts());
    }

  }, []);



  const updateWishlist = async (productId) => {
  
    const response = await axios.post(
      `http://localhost:4500/api/products/wishlist/add_product`,
      {
        userId: localStorage.getItem("userId"),
        productId: productId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("shopin-token")}`,
        },
      }
    ).catch((err)=>{

      Store.addNotification({
        title: "Product Already In  Wishlist",
        message: "Produc has been  in wishlist",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true
        }
     
      });
      console.log(err, "this sis the error getting")
      
    });

    if(response){
      Store.addNotification({
        title: "Product Added To Wishlist",
        message: "Product has been added to Wishlist",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true
        }
     
      });
      dispatch(wishlistProducts())

     }
     
  };

  const handleWishlist = async (key) => {
    if (!isLoggedIn) {
      navigate("/signup");
    } else {
    try {
     await updateWishlist(key);
      
    } catch (error) {
       console.log(error)
    }
     
    }
  };
  const handleProductPage = (key) =>{
      localStorage.setItem("shopinn-product-key", key)
       navigate("/product")     
  }

  return (
    <div className="today-section">
      {__todaysDealProducts.map((products) => {
        return (
          <div className="t-inner-card" key={products._id} >
            <div id="t-image-div" onClick={ ()=> handleProductPage(products._id)}>
              <img src={products.imageUrl} alt="" />
            </div>
            <div id="t-brand" onClick={ ()=> handleProductPage(products._id)}>
              <span>{products.name}</span>
            </div>
            <div id="t-price" onClick={ ()=> handleProductPage(products._id)}>
              <span>Rs. {products.price}</span>
            </div>
            <div id="t-rating" onClick={ ()=> handleProductPage(products._id)}>
              <span>*****</span>
            </div>
            <div className="wishlist-t">
              <button onClick={() => handleWishlist(products._id)}>
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
