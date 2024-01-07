import React from 'react'
import {useNavigate} from "react-router"
import "./Cart.css";
import { useSelector } from 'react-redux';
import CartProduct from '../../Component/CartProduct/CartProduct'
function Cart() {

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


const navigate = useNavigate()
const handleCheckout = ()=>{
               navigate("/my_order")
      
}

      return (
        <div className='cart-section'>
        
        <div className='main-cart-wrapper'>
                  <h3>My Cart list  <sup></sup></h3>
                  {___cartProducts.map((product) => (
                      <CartProduct
                        key={product._id}
                        name={product.name}
                        brand={product.brand}
                        imageUrl={product.imageUrl}
                        price={product.price}
                        productId={product._id}
                    
                      />
                      ))
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