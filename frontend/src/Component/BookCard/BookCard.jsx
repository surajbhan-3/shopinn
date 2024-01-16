import React from 'react'
import "./BookCard.css"
import PartLoader from '../PartLoader/PartLoader'
import { useContext } from 'react'
import { ProductContext } from '../../Context/ProductContext'

function BookCard({productId, imageUrl, name, rating, price}) {

 
 const {handleAddProductToWishlist,handleAddProductToCart, handleSingleProductPage, isLoading} = useContext(ProductContext)




// console.log(imageUrl, name, productId)
  return (
          <div className='book-card-container' key={productId}>
            {isLoading?<PartLoader />:null}

           <div className="book-inner-card"  >
                        <div id="book-image-div" onClick={ ()=> handleSingleProductPage(productId)}>
                          <img src={imageUrl} alt="" />
                        </div>
                        <div id="book-brand" onClick={ ()=> handleSingleProductPage(productId)}>
                          <span>{name}</span>
                        </div>
                        <div id="book-price" onClick={ ()=> handleSingleProductPage(productId)}>
                          <span>Rs. {price}</span>
                        </div>
                        <div id="book-rating" onClick={ ()=> handleSingleProductPage(productId)}>
                        {
                         rating===5?<div>☆☆☆☆☆</div>:rating===4?<div>☆☆☆☆</div>:rating===3?<div>☆☆☆</div>
                         :rating===2?<div>☆☆</div>:rating===1?<div>☆</div>:null
                         
                         } 
                        </div>
                        <div className="wishlist-book">
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

export default BookCard