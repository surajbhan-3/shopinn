import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios"
import apiService from '../../Config/apiService';
import "./Reviews.css";

function Reviews() {

    const [data, setData] = useState([])
  

    useEffect(()=>{

       
  const getAllReviews = async () => {
    try {
      const response = await apiService.get(
        `/products/reviews/get_all_reviews`,
        {
          // this data keyword is neccessary in axios when using delete method 
          data: {
            userId: localStorage.getItem("userId")
          }
        }
      );
      
  
    
      setData(response.data);
     
    } catch (err) {
      console.log(err);
    }
  };
  getAllReviews()
        
    },[])

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

const handleDeleteReview = async(key,productId)=>{

  

    try {
      const response = await apiService.delete(
        `/products/reviews/delete_reveiw`,
        {
          // this data keyword is neccessary in axios when using delete method 
          data: {
            reviewId: key,
            productId:productId
          }
        })
      
    } catch (error) {

       console.log(error)
      
    }

}

  return (
    <div className='reviews-userGivenReviews'>
            
            <div className='r-1-d'>
                 
                 {
                   data.map((el)=>{

                      return (
                        <div className='uReviews' key={el.productId}>
                        <div className='user-image'>
                      <img src={el.productData.imageUrl} alt="" />
                    </div>
                    <div className='userGivenReviews'>
                       <div className="productName">

                           <div>
                            {el.productData.name}
                           </div>
                          <div>
                          <span>{userReviewedTime(el.review.reviewDate)}</span>
                          </div>
                       </div> 
                
                         <div className="reviewTitle">
                          
                          <div id='htpd'><i>{el.review.reviewTitle}</i></div> 
                          <div>
                          {
                         el.review.rating===5?<span>⭐⭐⭐⭐⭐</span>:el.review.rating===4?<span>⭐⭐⭐⭐</span>:el.review.rating===3?<span>⭐⭐⭐</span>
                         :el.review.rating===2?<span>⭐⭐</span>:el.review.rating===1?<span>⭐</span>:null
                         } 
                          </div>
                         
                         </div>
                        
                         <div className="reviewData"><p>{el.review.reviewData}</p></div>
                         <div id='delbutton'>
                           <button id='dd'>lk</button>
                          <button onClick={()=>{handleDeleteReview(el.review._id,el.productId)}}>Delete</button> 
                          
                         </div>
                    </div>
                    </div>
                      )
                   })
                 }

            </div>

    </div>
  )
}

export default Reviews