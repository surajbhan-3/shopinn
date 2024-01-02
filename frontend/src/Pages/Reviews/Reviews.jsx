import React from 'react';
import { useEffect, useState } from 'react';
import "./Reviews.css";

function Reviews() {

    const [data, setData] = useState([])

    useEffect(()=>{

        
    })


  return (
    <div className='reviews-userGivenReviews'>
            
            <div className='r-1-d'>
                 
                 <div className="r-product-div">
                      <div className="r-product-image">
                        <img src="" alt="" />
                      </div>
                      <div className="r-product-details">
                         <div className="r-product-name"></div>
                          <div className="product-review"></div>
                           <div className="delete-review">
                             <button>Delete</button>
                            </div>  
                      </div>

                 </div>
            </div>

    </div>
  )
}

export default Reviews