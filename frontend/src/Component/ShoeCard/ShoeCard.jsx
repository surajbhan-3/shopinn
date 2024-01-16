import React from 'react'
import PartLoader from '../PartLoader/PartLoader'
import "./ShoeCard.css"
import { useContext } from 'react'
import { ProductContext } from '../../Context/ProductContext'

function ShoeCard({productId, imageUrl, name, rating, price}) {


 const {handleAddProductToWishlist,handleAddProductToCart, handleSingleProductPage, isLoading} = useContext(ProductContext)


// console.log(imageUrl, name, productId)
  return (
          <div className='shoe-card-container' key={productId}>
            {isLoading?<PartLoader />:
            
            
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
             
             {
            rating===5?<div>☆☆☆☆☆</div>:rating===4?<div>☆☆☆☆</div>:rating===3?<div>☆☆☆</div>
            :rating===2?<div>☆☆</div>:rating===1?<div>☆</div>:null
            
            } 
            
           </div>
           <div className="wishlist-shoe">
             <button onClick={() => handleAddProductToWishlist(productId)}>
               Add to wishlist
             </button>
             <button onClick={() => handleAddProductToCart(productId)}>
            Add to cart
             </button>
           </div>
</div>
            }

                    
            
         </div>

        
         
      )
}

export default ShoeCard