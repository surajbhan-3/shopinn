import React, { useContext, useEffect, useState } from 'react'

import { cartProducts, incrementCartData, decrementCartData } from '../../Redux/ProductReducer/Action'
import { incrementQuantity,decrementQuantity } from '../../Redux/ProductReducer/Action'
import { useDispatch, useSelector } from 'react-redux'
import "./CartProduct.css"
import { ProductContext } from '../../Context/ProductContext'


function CartProduct({productId,name, brand, imageUrl, price}) {
        const [initialCount, setInitialCount] = useState(1)
   const {moveProducToWishlist,removeProductFromCart} = useContext(ProductContext)

   const __cartItemsAndCount = (useSelector((state)=>{
      return state.ProductReducer.cartItemsAndCount
    }))

    // let productInfo = __orderDetails.find((el)=>{
    //    return el.productId === productId
    // })
    // console.log(productInfo)
    // console.log(productInfo.count, "this si sdflkasdfjklasfd")

    // const productCount = Number(productInfo.count)


const ___cartInitialPrice = (useSelector((state)=>{
  return state.ProductReducer.cartInitialPrice;    
}))
console.log(___cartInitialPrice, "hello inirial price")

    const dispatch = useDispatch();




 useEffect(()=>{
        
         dispatch(cartProducts());

},[dispatch])





const handleProductIncrement = async(key,price) =>{
  try {
     console.log(__cartItemsAndCount)
     console.log(key, price)
      const productInfo = __cartItemsAndCount.find((el)=>{
             if(el.productId === key)
             return  el;
      })
      console.log(productInfo, "hey this is the product info")
  //         console.log(productInfo, "this is product Incremetn tog lsfisd")
  //         // console.log(productInfo[0].count, productInfo.productId,"ladf asdfa sdlkfjal;sdkfjsdlkfj l")
  //  console.log(productInfo.count,"this is product count")
  //     if(productInfo[0].count===10){
  //       alert("out of stock product list")
  //     }
  
    
      
    
         const cartInitialPriceUpdate = ___cartInitialPrice+price;
         const cartDiscountedPriceUpdate = Math.floor(cartInitialPriceUpdate*(5/100))
         const cartTotalPriceUpdate = cartInitialPriceUpdate - cartDiscountedPriceUpdate
         const productId=key
        //  const incrementCount= Number(productInfo[0].count)+1
        //  console.log(incrementCount,"thsi si increment coutn")
         dispatch(incrementCartData(cartInitialPriceUpdate, cartDiscountedPriceUpdate,cartTotalPriceUpdate))
        // dispatch(incrementQuantity(productId,incrementCount))
  
  
  } catch (error) {
     console.log(error);
  }
  }



    const handleProductDecrement = async(key,price) =>{
        try {

    //       let productInfo = __orderDetails.filter((el)=>{
    //         if(el.productId === key)
    //         return  el;
    //  })
           const count=-1
          if(count===0 ){
           alert("remove item")
            // dispatch(decrementQuantity(productId,decrementCount)) 
          
          }else{
          
            const cartInitialPriceUpdate = ___cartInitialPrice-price;
            const cartDiscountedPriceUpdate = Math.floor(cartInitialPriceUpdate*(5/100))
            const cartTotalPriceUpdate = cartInitialPriceUpdate - cartDiscountedPriceUpdate
            const productId=key
            const decrementCount= -1
              console.log("hasdfkas dkfasdlkfjasd;flkj")
              dispatch(decrementCartData(cartInitialPriceUpdate, cartDiscountedPriceUpdate,cartTotalPriceUpdate))
            console.log("hello mistaack   ")
              dispatch(decrementQuantity(productId,decrementCount))
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
                  <button>{initialCount}</button>
                 <button onClick={()=>{handleProductIncrement(productId,price)}}>+</button>
             </div>
    
            <div className='move-remove-btn-cartpage'>
                <div>
                    <button  onClick={()=>{removeProductFromCart(productId,price)}}  >Remove</button>
                </div>
                <div>
                  <button onClick={() => { moveProducToWishlist(productId); removeProductFromCart(productId) }} >Move to wishlist</button>
                </div>
            </div>
              </div>
      
        </div>     
   
  )
}

export default CartProduct


