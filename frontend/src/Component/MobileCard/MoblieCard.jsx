import React, { useState } from 'react'
import PartLoader from '../PartLoader/PartLoader'
import "./MobileCard.css"

function MobileCard({productId, imageUrl, name, price}) {

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
          <div className='mobile-card-container' key={productId}>
            {isLoading?<PartLoader />:null}

           <div className="mobile-inner-card"  >
                        <div id="mobile-image-div" onClick={ ()=> handleSingleProductPage(productId)}>
                          <img src={imageUrl} alt="" />
                        </div>
                        <div id="mobile-brand" onClick={ ()=> handleSingleProductPage(productId)}>
                          <span>{name}</span>
                        </div>
                        <div id="mobile-price" onClick={ ()=> handleSingleProductPage(productId)}>
                          <span>Rs. {price}</span>
                        </div>
                        <div id="mobile-rating" onClick={ ()=> handleSingleProductPage(productId)}>
                          <span>*****</span>
                        </div>
                        <div className="wishlist-mobile">
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

export default MobileCard