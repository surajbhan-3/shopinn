import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from "axios";
import { Rating } from 'react-simple-star-rating'
import "./Product.css"

function Product() {

  let productId =localStorage.getItem("shopinn-product-key")

    const [data, setData] = useState([])
      const [reviewData, setReviewData] = useState([]);
      const [reviewAddBox, setReviewAddBox] = useState(false)
      const [rating, setRating] = useState(0)
    const ___cartProducts = (useSelector((state)=>{
      return state.ProductReducer.cartData
}))


console.log(___cartProducts, "cartpreoda")

const __wishlistProducts = useSelector((state) => {
  return state.ProductReducer.wishlistData;
});

let isProductPresentInCart = false;
let isProductPresentInWishlist = false;

let checkProductInCart = ___cartProducts.find((el)=>{
        return el._id === productId
})
if(checkProductInCart){
  isProductPresentInCart=true
}

if(checkProductInCart){
  console.log("true")
}

let checkProductInWishlist = __wishlistProducts.find((el)=>{
   return el._id === productId
})
if(checkProductInWishlist){
   isProductPresentInWishlist = true;
}


    const __productKey = localStorage.getItem("shopinn-product-key")
    



      useEffect(()=>{
        const getSingleProduct = async () => {
          try {
            const response = await axios.get(
              `http://localhost:4500/api/products/product_details/${__productKey}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("shopin-token")}`,
                },
              }
            );
            console.log(response);
            setData(response.data[0]);
            setReviewData(response.data[1]);
          } catch (error) {
            console.error("Error fetching data:", error.response || error);
            // Handle errors (e.g., set error state)
          }
        };
      
        getSingleProduct();
    },[__productKey])
    

const handleAddReview = async ()=>{

   setReviewAddBox(prevState => !prevState)
   console.log(reviewAddBox)
}


const handleRating = (rate) => {
  setRating(rate)
     console.log(rating, "this is the stae of rating")
  // other logic
}

const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value, index) => console.log(value, index)


  return (
    <div className='product_page'>
     
     <div className='productWrapper'>
        {data.map((product) => {
            return (
                <div className='in-card' key={product._id}> 
                     <div className="left-div">
                           <img src={product.imageUrl} alt="" />
                     </div>
                     <div className="right-div">
                        <h1>{product.name}</h1>
                         <p>by: {product.brand}</p>
                        <div>
                            <p>{product.description}</p>
                        </div>
                         <div>
                            <p>Price : Rs.{product.price}</p>
                         </div>

                         <div>
                          {isProductPresentInCart? <button>Go to Cart</button> :<button>Add to cart</button>  }
                           
                         </div>

                      <div>
                      {isProductPresentInWishlist? <button>Go to Wishlist</button> :<button>Add to Wishlist</button>  }
                      </div>

                      <div className="reviewsSection">
                      <div>
      <div className="userReview">
                          <div className="addReviewButton">

                            <button onClick={handleAddReview} >Add Review</button>
                            
                          </div>
                         
                          {
                            
                            reviewAddBox ? 
                           (  <div className="writeReview">
                           <form action="">
                             <label htmlFor="">How satisfy You are</label>
                                  <Rating className='rating-star-c'
                                      onClick={handleRating}
                                      onPointerEnter={onPointerEnter}
                                      onPointerLeave={onPointerLeave}
                                      onPointerMove={onPointerMove}
                                      /* Available Props */
                                    />
                            <label>Title</label>
                            <input type="text" placeholder='Title of the product' />
                           <label htmlFor="">Write Review</label> <br />
                            <textarea name="" id="" cols="40" rows="10"></textarea>
                           </form>
                      </div>)
                            
                            :(null) 
                           
                          }
                          </div>

                          <div >
                                {
                                 reviewData.map((el)=>{

                                  return (
                                    <div className='allReviews' key={el.user.username}>
                                    <div className='user-image'>
                                  <img src={el.user.avtar} alt="" />
                                </div>
                                <div className='userGivenReviews'>
                                   <div className="userName">{el.user.username}<span>{el.rating}</span></div> 
                                     <div className="reviewTitle"><p>{el.reviewTitle}</p></div>
                                     <div className="reviewData">{el.reviewData}</div>
                                </div>
                                </div>
                                  )
                                 })
                                }
                          </div>
    </div>
                     </div>
                      

                     </div>


                     

                      
                </div>
            )
        })}
    </div>
 </div>
  )
}

export default Product