import React, { useState } from 'react'
import "./BookCard.css"
import PartLoader from '../PartLoader/PartLoader'


function BookCard({productId, imageUrl, name, price}) {

 const [partLoader, setPartLoader]= useState(false)
 const isLoading = partLoader

const handleSingleProductPage = async () =>{
        

}

const handleAddProductToWishlist = async () =>{

    
}
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
                          <span>*****</span>
                        </div>
                        <div className="wishlist-book">
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

export default BookCard