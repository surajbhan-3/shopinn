import React, { useEffect } from 'react'
import { Store } from 'react-notifications-component'
import axios from 'axios'
import { cartProducts, wishlistProducts, incrementCartData, decrementCartData } from '../../Redux/ProductReducer/Action'
import { incrementQuantity,decrementQuantity } from '../../Redux/ProductReducer/Action'
import { useDispatch, useSelector } from 'react-redux'
import "./CartProduct.css"


function CartProduct({productId,name, brand, imageUrl, price}) {

    // const [intialcount , setCount] = useState(1)
  

   const __orderDetails = (useSelector((state)=>{
      return state.ProductReducer.cartItemsAndCount
    }))

    console.log(__orderDetails, "this is top of the order detail")
    let productInfo = __orderDetails.find((el)=>{
       return el.productId === productId
    })
    console.log(productInfo)
    console.log(productInfo.count, "this si sdflkasdfjklasfd")

    const productCount = Number(productInfo.count)

    console.log(__orderDetails,"here his the order detaisl")

const ___cartInitialPrice = (useSelector((state)=>{
  return state.ProductReducer.cartInitialPrice;    
}))
console.log(___cartInitialPrice, "hello inirial price")

    const dispatch = useDispatch();

      useEffect(()=>{
       
         dispatch(cartProducts());

},[dispatch])





    const handleProductDecrement = async(key,price) =>{
        try {

          const productInfo = __orderDetails.filter((el)=>{
            if(el.productId === key)
            return  el;
     })
           const count=productInfo[0].count-1
          if(count===0 ){
           alert("remove item")
            // dispatch(decrementQuantity(productId,decrementCount)) 
          
          }else{
          
            const cartInitialPriceUpdate = ___cartInitialPrice-price;
            const cartDiscountedPriceUpdate = Math.floor(cartInitialPriceUpdate*(5/100))
            const cartTotalPriceUpdate = cartInitialPriceUpdate - cartDiscountedPriceUpdate
            const productId=key
            const decrementCount= productInfo[0].count-1
              console.log("hasdfkas dkfasdlkfjasd;flkj")
              dispatch(decrementCartData(cartInitialPriceUpdate, cartDiscountedPriceUpdate,cartTotalPriceUpdate))
            console.log("hello mistaack   ")
              dispatch(decrementQuantity(productId,decrementCount))
          }
         
        } catch (error) {

          console.log(error)
          
        }
}


const handleProductIncrement = async(key,price) =>{
try {
    const productInfo = __orderDetails.filter((el)=>{
           if(el.productId === key)
           return  el;
    })
        console.log(productInfo, "this is product Incremetn tog lsfisd")
        console.log(productInfo[0].count, productInfo.productId,"ladf asdfa sdlkfjal;sdkfjsdlkfj l")
 console.log(productInfo.count,"this is product count")
    if(productInfo[0].count===10){
      alert("out of stock product list")
    }

  
    
  
       const cartInitialPriceUpdate = ___cartInitialPrice+price;
       const cartDiscountedPriceUpdate = Math.floor(cartInitialPriceUpdate*(5/100))
       const cartTotalPriceUpdate = cartInitialPriceUpdate - cartDiscountedPriceUpdate
       const productId=key
       const incrementCount= Number(productInfo[0].count)+1
       console.log(incrementCount,"thsi si increment coutn")
       dispatch(incrementCartData(cartInitialPriceUpdate, cartDiscountedPriceUpdate,cartTotalPriceUpdate))
      dispatch(incrementQuantity(productId,incrementCount))


} catch (error) {
   console.log(error);
}
}


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
      
      // console.log(response, "wishlist response");
      dispatch(cartProducts());
    } catch (err) {
      console.log(err);
    }
  };
  
  
  
  
  
  const handleMoveToWishlist = async (key)=>{
  
    try {
      // console.log("handleng fromwishlist")
     await moveProducToWishlist(key);
     await removeProductFromCart(key);
    
    } catch (error) {
       console.log(error)
    }
  }
  
  const handleRemoveFromCart = async (key,price)=>{
    if(productInfo.count!==1){
      alert("decreased to 1")
      return null;
      
    }
  
    try {
      console.log("handleng fromwishlist")
     await removeProductFromCart(key,price);
    
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
                  <button>{productCount}</button>
                 <button onClick={()=>{handleProductIncrement(productId,price)}}>+</button>
             </div>
    
            <div className='move-remove-btn-cartpage'>
                <div>
                    <button  onClick={()=>{handleRemoveFromCart(productId,price)}}  >Remove</button>
                </div>
                <div>
                  <button onClick={() => { handleMoveToWishlist(productId); handleRemoveFromCart(productId) }} >Move to wishlist</button>
                </div>
            </div>
        </div>
      
                  </div>     
   
  )
}

export default CartProduct


