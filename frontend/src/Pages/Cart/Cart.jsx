import React from 'react'
import {useNavigate} from "react-router"
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios  from 'axios';
import "./Cart.css";
import { useSelector } from 'react-redux';
import CartProduct from '../../Component/CartProduct/CartProduct'
import { cartProducts, wishlistProducts } from '../../Redux/ProductReducer/Action';
function Cart() {

  const dispatch = useDispatch()

  // useEffect(()=>{
  //   dispatch(wishlistProducts());
  //   dispatch(cartProducts());
  // },[])


  const ___cartProducts = (useSelector((state)=>{
    return state.ProductReducer.cartData
}))

const ___cartInitialPrice = (useSelector((state)=>{
     return state.ProductReducer.cartInitialPrice;    
}))
const ___cartDiscountedPrice = (useSelector((state)=>{
   return state.ProductReducer.cartDiscountedPrice
}))

const ___cartTotalPrice = (useSelector((state)=>{
  return state.ProductReducer.cartTotalPrice
}))
const __orderDetails = (useSelector((state)=>{
  return state.ProductReducer.cartItemsAndCount
}))


const navigate = useNavigate()
const handleCheckout = async()=>{


  try {

    const  response = await axios.post(`http://localhost:4500/api/products/order_details`,
           {
         data:__orderDetails
        },
      {
         headers:{
 
               Authorization: `Bearer ${localStorage.getItem("shopin-token")}`,

             }
              }
 )
console.log(response)
navigate("/my_order")
    
  } catch (error) {
    
  }

               
      
}

      return (
        <div className='cart-section'>
        
        <div className='main-cart-wrapper'>
                  <h3>My Cart list  <sup></sup></h3>
                   {___cartProducts && ___cartProducts.length>0 ? ___cartProducts.map((product) => (
                      <CartProduct
                        key={product._id}
                        name={product.name}
                        brand={product.brand}
                        imageUrl={product.imageUrl}
                        price={product.price}
                        productId={product._id}
                    
                      />
                      )): <p>You don't have products in Cart</p>
                  }
        </div>    
            <div className='cart-price-cal'>
              <h3> Amount Details <sup></sup></h3>
              <div className="cart-data-cal">
              <div id='priceitems'>
                   <div>Price</div>
                  <div>Rs. {___cartInitialPrice}</div>
              </div>
              <div id='deliverycharges'>
                   <div>
                      Delivery charges 
                   </div>
                   <div>
                      Free
                   </div>
              </div>

            <div className='discountprice'>
              <div>  Discount   </div>
              <div>   5%    </div>
            </div>
            <div className='discountprice'>
              <div>  Discounted Price   </div>
              <div>  Rs. {___cartDiscountedPrice}   </div>
            </div>
              
              <div id='totalamount'>
                   <div>   Total Amount   </div>
                   <div>   Rs. {___cartTotalPrice}  </div>
              </div>
              
              <button onClick={handleCheckout} id='checkoutbutton'>Check Out </button>
              
              </div>
              </div>
         
  </div>
      )
}

export default Cart