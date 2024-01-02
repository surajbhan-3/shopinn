import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { cartProducts, wishlistProducts } from '../../Redux/ProductReducer/Action'
import axios from 'axios'
import { Store } from 'react-notifications-component'
import "./Cart.css";



function Cart() {


const ___cartProducts = (useSelector((state)=>{
           return state.ProductReducer.cartData
}))


const dispatch = useDispatch();

useEffect(()=>{
       
         dispatch(cartProducts());

},[])

const moveProducToWishlist = async (productId) => {
  
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
  dispatch(wishlistProducts())

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
    // dispatch(wishlistProducts())

   }
   
};


const removeProductFromCart = async (productId) => {
  try {
    const response = await axios.delete(
      `http://localhost:4500/api/products/cart/remove_cart_items/${productId}`,
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
    dispatch(cartProducts());
  } catch (err) {
    console.log(err);
  }
};





const handleMoveToWishlist = async (key)=>{

  try {
    console.log("handleng fromwishlist")
   await moveProducToWishlist(key);
   await removeProductFromCart(key);
  
  } catch (error) {
     console.log(error)
  }
}

const handleRemoveFromCart = async (key)=>{

  try {
    console.log("handleng fromwishlist")
   await removeProductFromCart(key);
  
  } catch (error) {
     console.log(error)
  }
}


 
  return (
    <div className='cart-section'>
    {___cartProducts.map((products) => {
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
       <div className='move-remove-btn-cartpage'>
       <div>
          <button  onClick={()=>{handleRemoveFromCart(products._id)}}  >Remove</button>
      </div>
      <div>
        <button onClick={() => { handleMoveToWishlist(products._id); handleRemoveFromCart(products._id) }} >Move to wishlist</button>
      </div>
       </div>
     
    </div>
  );
})}
</div>
  )
}

export default Cart