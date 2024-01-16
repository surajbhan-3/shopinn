import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import apiService from '../../Config/apiService';
import { Rating } from 'react-simple-star-rating'
import "./Product.css"
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import PartLoader from '../../Component/PartLoader/PartLoader';



function Product() {
 const {isLoggedIn} = useContext(AuthContext);
 const navigate = useNavigate()
  let productId =localStorage.getItem("shopinn-product-key")

    const [data, setData] = useState([])
      const [reviewData, setReviewData] = useState([]);
      const [reviewAddBox, setReviewAddBox] = useState(false)
      const [rating, setRating] = useState(0)
      const [title , setTitle] = useState("")
      const [reviewText, setReviewText] = useState("")
      const [partLoader, setPartLoader] = useState(false);
      const isLoading = partLoader
    const ___cartProducts = (useSelector((state)=>{
      return state.ProductReducer.cartData
}))




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
    const userId = localStorage.getItem("userId")
    



      useEffect(()=>{
        const getSingleProduct = async () => {
          try {
            const response = await apiService.get(
              `/products/product_details/${__productKey}`,
              
            );
      
            setData(response.data[0]);
            setReviewData(response.data[1]);
  
          } catch (error) {
            console.error("Error fetching data:", error.response || error);
            // Handle errors (e.g., set error state)
          }

        };
      
        getSingleProduct();
    },[__productKey])
    
console.log(userId, "hii user id")
const userAlreadyReviewed = reviewData.find((el)=>{
     return el.user.userId === userId;
})


const handleAddReview = async ()=>{

   isLoggedIn ? (
    setReviewAddBox(prevState => !prevState)
    // console.log(reviewAddBox)
   ): navigate("/login")
}


const handleRating = (rate) => {
  setRating(rate)

  // other logic
}

const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value, index) => console.log(value, index)


const finalReviewDataFromUser ={
        rating:rating,
        reviewTitle:title,
        reviewText:reviewText

}

 const handleWriteReview = async (e) =>{
      e.preventDefault();

         
 
     // when working with axios you don't need to stringfy and dont' need to write body just like we do in fetch 
             setPartLoader(true)
           try {
            
            const response = await apiService.post(
              `/user/products/review/${__productKey}`,
              {
                finalReviewDataFromUser
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("shopin-token")}`,
                },
              }
            );
             setPartLoader(false)
           
              setRating(0)
              setReviewText("")
              setTitle("")
              window.location.reload()
           } catch (error) {
              console.log(error)
              setPartLoader(false)
           }
 }




const userReviewedTime =(time)=>{

  const currentTime = new Date();
  const reviwedTime = new Date(time);
  const difference = currentTime.getTime() - reviwedTime.getTime();
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  return days > 0
  ? `${days} days ago`
  : hours > 0
  ? `${hours} hours ago`
  : minutes > 0
  ? `${minutes} minutes ago`
  : `${seconds} seconds ago`;

}



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
                         <p>By : {product.brand}</p>
                        <div>
                            <p>{product.description}</p>
                        </div>
                         <div>
                            <p>Price : Rs.{product.price}</p>
                         </div>

                             <div className="btc-wrapper">
                             <div className='gtc-button'>
                          {isProductPresentInCart? <button>Go to Cart</button> :<button>Add to cart</button>  }
                           
                         </div>

                          <div className='gtw-button'>
                          {isProductPresentInWishlist? <button>Go to Wishlist</button> :<button>Add to Wishlist</button>  }
                          </div>

                             </div>
                      <div className="reviewsSection">
                      <div>
      {isLoading?<PartLoader/>: 
        <div className="userReview">

        <div className='all-reviews-of-product'>
             <i id='stpr'>See the Proudct Reviews</i>
        </div>
        <div className="addReviewButton">

            {
              userAlreadyReviewed? null:  <button onClick={handleAddReview} >
              {reviewAddBox ? "Adding Review" : "Add Review"}
              </button>
            }
            
            
        </div>
       
        {
          
          reviewAddBox ? 
         (  <div className="writeReview">
         <form action="" className='rf-review-form' onSubmit={handleWriteReview}>
           <label htmlFor="">How satisfy You are</label>
                <Rating size={25} className='rating-star-c'
                    onClick={handleRating}
                    onPointerEnter={onPointerEnter}
                    onPointerLeave={onPointerLeave}
                    onPointerMove={onPointerMove}
                    /* Available Props */
                  />
          <label id='rt-title'>Title</label>
          <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} maxLength={40} placeholder='Title of the product' />
         <label htmlFor="" id='rt-feed'>Write Review</label> 
          <textarea name="" id="" cols="40" rows="10" maxLength={250} value={reviewText} onChange={(e)=> setReviewText(e.target.value)}></textarea>
          <button type='submit'>Submit</button>
         </form>
    </div>)
          
          :(null) 
         
        }
</div>

      }
                          <div >
                                {
                                 reviewData.map((el)=>{

                                  return (
                                    <div className='allReviews' key={el.user.username}>
                                    <div className='user-image'>
                                  <img src={el.user.avtar} alt="" />
                                </div>
                                <div className='userGivenReviews'>
                                   <div className="userName">

                                       <div>
                                       {el.user.username}
                                       </div>
                                      <div>
                                      <span>{userReviewedTime(el.reviewDate)}</span>
                                      </div>
                                   </div> 
                            
                                     <div className="reviewTitle">
                                      
                                      <div id='htpd'><i>{el.reviewTitle}</i></div> 
                                      <div>
                                      {
                                     el.rating==5?<span>⭐⭐⭐⭐⭐</span>:el.rating==4?<span>⭐⭐⭐⭐</span>:el.rating==3?<span>⭐⭐⭐</span>
                                     :el.rating==2?<span>⭐⭐</span>:el.rating==1?<span>⭐</span>:null
                                     } 
                                      </div>
                                     
                                     </div>
                                    
                                     <div className="reviewData"><p>{el.reviewData}</p></div>
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