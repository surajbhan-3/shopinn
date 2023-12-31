import React from 'react'
import "./Reviews.css"
function Reviews() {
  return (
    <div>
      <div className="userReview">
                          <div className="addReviewButton"><button>Add Review</button></div>
                          <div className="addStarRating">Star rating</div>
                          <div className="writeReview">
                                <label htmlFor="">Write Review</label> <br />
                                <textarea name="" id="" cols="30" rows="10"></textarea>
                          </div>
                          </div>

                          <div className="allReviews">
                                  <div className='user-image'>
                                    <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="" />
                                  </div>
                                  <div className='userGivenReviews'>
                                     <div className="userName">username <span>StarsGiven</span></div> 
                                       <div className="reviewTitle"><p>Review Title</p></div>
                                       <div className="reviewData">aslfdjsal;dkfj;askdlf</div>
                                  </div>
                          </div>
    </div>
  )
}

export default Reviews