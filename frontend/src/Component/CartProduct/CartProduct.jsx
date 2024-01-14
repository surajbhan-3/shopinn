import React, { useContext, useEffect, useState } from 'react'

import { cartProducts, incrementCartData, decrementCartData } from '../../Redux/ProductReducer/Action'
import { incrementQuantity,decrementQuantity } from '../../Redux/ProductReducer/Action'
import { useDispatch, useSelector } from 'react-redux'
import "./CartProduct.css"
import { ProductContext } from '../../Context/ProductContext'


function CartProduct({productId,name, brand, imageUrl, price}) {

   const {moveProducToWishlist,removeProductFromCart} = useContext(ProductContext)

   const __cartItemsAndCount = (useSelector((state)=>{
      return state.ProductReducer.cartItemsAndCount
    }))

  


const ___cartInitialPrice = (useSelector((state)=>{
  return state.ProductReducer.cartInitialPrice;    
}))

    const dispatch = useDispatch();




 useEffect(()=>{
        
         dispatch(cartProducts());

},[dispatch])





const handleProductIncrement = async(key,price) =>{
  try {
  
   
               if(countElement.count === 10){
                  countElement.count = 10
                  alert("Out of Stock")
               }else{

            
                countElement.count =  countElement.count + 1
                const cartInitialPriceUpdate = ___cartInitialPrice+price;
                const cartDiscountedPriceUpdate = Math.floor(cartInitialPriceUpdate*(5/100))
                const cartTotalPriceUpdate = cartInitialPriceUpdate - cartDiscountedPriceUpdate
                const productId=key
      
                const countData = countElement.count
                dispatch(incrementCartData(cartInitialPriceUpdate, cartDiscountedPriceUpdate,cartTotalPriceUpdate))
               dispatch(incrementQuantity(productId, countData))
         
                
               }
          
  
  } catch (error) {
     console.log(error);
  }
  }



 const handleProductDecrement = async(key,price) =>{
        try {

           
          if(countElement.count - 1 === 0 ){
               countElement.count = 1
           alert("remove item")
          
          }else{
               
              countElement.count = countElement.count - 1
            const cartInitialPriceUpdate = ___cartInitialPrice-price;
            const cartDiscountedPriceUpdate = Math.floor(cartInitialPriceUpdate*(5/100))
            const cartTotalPriceUpdate = cartInitialPriceUpdate - cartDiscountedPriceUpdate
            const productId=key
              dispatch(decrementCartData(cartInitialPriceUpdate, cartDiscountedPriceUpdate,cartTotalPriceUpdate))
           
            const countData = countElement.count
              dispatch(decrementQuantity(productId,countData))
          }
         
        } catch (error) {

          console.log(error)
          
        }
}



  return (
    
        <div className="t-inner-card" key={productId}>
             <div id="t-image-div">
          <img src={imageUrl} alt="" />
              </div>
               <div className='content-div'>
              
            <div id="t-product">
              <span>{name}</span>
            </div>
            <div id='t-brand'>
              <span>By : {brand}</span>
              </div>  
            <div id="t-price">
              <span>Rs. {price}</span>
            </div>
           
             <div className="increment-divs-button">
                 <button onClick={()=>{handleProductDecrement(productId,price)}} >-</button>
                  <button>{countElement &&  countElement.count ? countElement.count: null}</button>
                 <button onClick={()=>{handleProductIncrement(productId,price)}}>+</button>
             </div>
    
            <div className='move-remove-btn-cartpage'>
                <div>
                    <button  onClick={
                      ()=>{
                         if(countElement.count!==1){
                          alert("reduce to one")
                         }else{
                          removeProductFromCart(productId)
                         }
                      }
                      
                      }  >Remove</button>
                </div>
                <div>
                  <button onClick={() => {
                    if(countElement.count!==1){
                      alert("reduce to one")
                     }else{
                      moveProducToWishlist(productId); 
                      removeProductFromCart(productId,price)
                     }
                      
                   
                  
                     
                     }} >Move to wishlist</button>
                </div>
            </div>
              </div>
      
        </div>     
   
  )
}

export default CartProduct


