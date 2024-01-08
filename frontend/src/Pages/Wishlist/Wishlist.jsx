import React, { useEffect } from 'react'
import { wishlistProducts } from "../../Redux/ProductReducer/Action";
import { cartProducts } from '../../Redux/ProductReducer/Action';
import { useDispatch, useSelector } from "react-redux";
import { incrementQuantity } from '../../Redux/ProductReducer/Action';
import axios from "axios";
import { Store } from 'react-notifications-component';



import "./Wishlist.css"

function Wishlist() {
   let data = true;

    const __wishlistProducts = useSelector((state) => {
        return state.ProductReducer.wishlistData;
      });
      const dispatch = useDispatch();
    

    useEffect(()=>{
               dispatch(wishlistProducts());
    },[])

  const updateCartProduct = async (productId,name) => {
      const response = await axios.post(
        `http://localhost:4500/api/products/cart/add_to_cart`,
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
        title: "Product Already In  Cart",
        message: "Produc has been  in cart",
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
  
        console.log(err)

      });
      dispatch(incrementQuantity(productId, 1, name))
  
       if(response){
      Store.addNotification({
        title: "Product Added To Cart",
        message: "Product has been added to cart",
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
         
      dispatch(cartProducts())
  
       
       }
    };       



    const removeProductFromWishlist = async (productId) => {
      try {
        const response = await axios.delete(
          `http://localhost:4500/api/products/wishlist/remove_product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("shopin-token")}`,
            },
            // this data keyword is neccessary in axios when using delete method 
            data: {
              userId: localStorage.getItem("userId")
            }
          }
        );
    
        console.log(response, "wishlist response");
        dispatch(wishlistProducts());
      } catch (err) {
        console.log(err);
      }
    };
    
 


   


const handleAddToCart = async (key,name) =>{
  try {
   await updateCartProduct(key,name);
  } catch (error) {
     console.log(error)
  }
}

const handleRemoveFromWhislist = async (key) =>{
  try {
    console.log("handleng fromwishlist")
   await removeProductFromWishlist(key);
  
  } catch (error) {
     console.log(error)
  }
}



  return (
    <div className='wishlist-section'>
          {__wishlistProducts?__wishlistProducts.map((products) => {
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
               <button  onClick={() => { handleAddToCart(products._id,products.name); handleRemoveFromWhislist(products._id) }}>Move to cart</button>
               </div>
               <div>
                  <button  onClick={()=>{handleRemoveFromWhislist(products._id)}}>Remove</button>

              </div>
            </div>
           
          </div>
        );
      }):<p>You Don't have any Item in wishlist</p>}
    </div>
  )
}

export default Wishlist