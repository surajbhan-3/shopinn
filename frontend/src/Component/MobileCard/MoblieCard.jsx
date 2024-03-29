import React, { useState } from 'react'
import PartLoader from '../PartLoader/PartLoader'
import "./MobileCard.css"
import { useContext } from 'react'
import { ProductContext } from '../../Context/ProductContext'

function MobileCard({productId, imageUrl, name, rating, price}) {

 const [partLoader, setPartLoader]= useState(false)
 const isLoading = partLoader
 const {handleAddProductToWishlist,handleAddProductToCart, handleSingleProductPage } = useContext(ProductContext)




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
                        {
                         rating===5?<div>☆☆☆☆☆</div>:rating===4?<div>☆☆☆☆</div>:rating===3?<div>☆☆☆</div>
                         :rating===2?<div>☆☆</div>:rating===1?<div>☆</div>:null
                         
                         } 
                        </div>
                        <div className="wishlist-mobile">
                          <button onClick={() => handleAddProductToWishlist(productId)}>
                            Add to wishlist
                          </button>
                          <button onClick={() => handleAddProductToCart(productId)}>
                         Add to cart
                          </button>
                        </div>
            </div>
                    
            
         </div>

        
         
      )
}

export default MobileCard