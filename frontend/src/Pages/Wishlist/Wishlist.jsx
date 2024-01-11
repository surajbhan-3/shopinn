import React from 'react'
import { useSelector } from "react-redux";
import { ProductContext } from '../../Context/ProductContext';
import { useContext } from 'react';
import "./Wishlist.css"

function Wishlist() {
 
          
    const __wishlistProducts = useSelector((state) => {
        return state.ProductReducer.wishlistData;
      });
    
  const {removeProductFromWishlist,handleAddProductToCart} = useContext(ProductContext)

      

  return (
    <div className='wishlist-section'>
          {__wishlistProducts && __wishlistProducts.length>0?__wishlistProducts.map((products) => {
        return (
          <div className="t-inner-card" key={products._id}>
            <div id="t-image-div">
              <img src={products.imageUrl} alt="" />
            </div>
            <div id="t-brand">
              <span>{products.name}</span>
            </div>
            <div id="t-price">
              <span>Rs. {products.price}</span>
            </div>
            <div id="t-rating">
              <span>*****</span>
            </div>
            <div className='move-remove-btn-wishlist'>
               <div>
               <button  onClick={() => { handleAddProductToCart(products._id,products.name); removeProductFromWishlist(products._id) }}>Move to cart</button>
               </div>
               <div>
                  <button  onClick={()=>{removeProductFromWishlist(products._id)}}>Remove</button>

              </div>
            </div>
           
          </div>
        );
      }):<p>You Don't have any Item in wishlist</p>}
    </div>
  )
}

export default Wishlist