import React, { useState } from 'react'
import PartLoader from '../PartLoader/PartLoader'
import "./ShoeCard.css"


function ShoeCard({productId, imageUrl, name, price}) {

 const [partLoader, setPartLoader]= useState(false)
 const isLoading = partLoader

const handleSingleProductPage = async () =>{
          setPartLoader(true)
        setTimeout(() => {
              setPartLoader(false)
            console.log("hello")
          }, 2000);
    

}

const handleAddProductToWishlist = async () =>{

    
}
// console.log(imageUrl, name, productId)
  return (
          <div className='shoe-card-container' key={productId}>
            {isLoading?<PartLoader />:null}

           <div className="shoe-inner-card"  >
                        <div id="shoe-image-div" onClick={ ()=> handleSingleProductPage(productId)}>
                          <img src={imageUrl} alt="" />
                        </div>
                        <div id="shoe-brand" onClick={ ()=> handleSingleProductPage(productId)}>
                          <span>{name}</span>
                        </div>
                        <div id="shoe-price" onClick={ ()=> handleSingleProductPage(productId)}>
                          <span>Rs. {price}</span>
                        </div>
                        <div id="shoe-rating" onClick={ ()=> handleSingleProductPage(productId)}>
                          <span>*****</span>
                        </div>
                        <div className="wishlist-shoe">
                          <button onClick={() => handleAddProductToWishlist(productId)}>
                            Add to wishlist
                          </button>
                          <button onClick={() => handleAddProductToWishlist(productId)}>
                         Add to cart
                          </button>
                        </div>
            </div>
                    
            
         </div>

        
         
      )
}

export default ShoeCard