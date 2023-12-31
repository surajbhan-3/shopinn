import React from 'react'
import "./Category.css";
import { Link } from "react-router-dom";
import Moblie from "./../../assets/iphone.png"
import Shoes from "./../../assets/shoes.png"
import Open from "./../../assets/open-book.png"

function Category() {
  return (

     
       
     <div>
         <div className='browsebycategory'>
            <h2>Browse By Category</h2>
         </div>

         <div className='category-class'>
          <div>
            <Link to="/mobiles">
            <img width="100%" height="100%" src={Moblie} alt="" srcset="" />
            </Link>
          </div>
          <div>
          <Link to="/shoes">
          <img width="100%" height="100%" src={Shoes} alt="" srcset="" />
          </Link>
          </div>
          <div>
         
         <Link to="/books">
         <img width="100%" height="100%" src={Open} alt="" srcset="" />
         </Link>
          </div>


    </div>
     </div>

  )
}

export default Category