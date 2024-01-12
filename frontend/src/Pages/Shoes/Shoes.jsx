import React from 'react'
import ShoeCard from '../../Component/ShoeCard/ShoeCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./Shoes.css"




function Shoes() {

  const [shoesData, setShoesData]= useState([])
  const [pageIndex, setPageIndex] = useState(1)
  
  const colorSyle = {
    backgroundColor: '#ff4e5c',
  };
  

  useEffect(()=>{

    const getShoesProducts = async()=>{
  
      try {
       const response = await axios.get(
         `http://localhost:4500/api/products/category/shoes/page/1`,
         {
           headers: {
             Authorization: `Bearer ${localStorage.getItem("shopin-token")}`,
           },
    
           
         })
         console.log(response)
         setShoesData(response.data)
  
         console.log(response.data, "here shoes  data")
       
      } catch (error) {
        console.log(error)
      }
    }
    getShoesProducts()
  
  },[])  
  // console.log(booksData, "hey shoes data")
  
    
  const handlePagination = async(pageNumber) =>{
    try {
     const response = await axios.get(
       `http://localhost:4500/api/products/category/shoes/page/${pageNumber}`,
      
       {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("shopin-token")}`,
         }, 
         
          
       })
       console.log(response)
       setShoesData(response.data)
       setPageIndex(pageNumber)
       console.log(response.data, "here shoes  data")
     
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='main-shoes'>
    <div className="main-shoes-wrapper">

              <div className="main-shoes-left">
                     <div className="main-shoes-left-inner-wrapper">
                          <select name="" className="left-cct">
                           <option value="">Category</option>
                           <option value="fiction">Fiction</option>
                           <option value="sci-fi">Sci-Fi</option>
                           <option value="motivational">Motivational</option>
                          </select> <br />
                           <select name="" className="left-cct">
                             <option value="">Price</option>
                             <option value="lth">Low To High</option>
                             <option value="htl">High To Low</option>
                           </select>
                          <div className='cchbox' ><span>Rs.100 - Rs.299 </span><input type="checkbox" name="" id="" /></div>
                          <div className='cchbox' ><span>Rs.300 - Rs.599 </span><input type="checkbox" name="" id="" /></div>
                          <div className='cchbox' ><span>Rs.600 - Rs.999 </span><input type="checkbox" name="" id="" /></div>
                          <div className='cchbox' ><span>Rs.1000 - Rs.1999 </span><input type="checkbox" name="" id="" /></div>

                     </div>
              </div>
              <div className="main-shoes-right">
                    <div className="shoes-container">
                        
                        {shoesData ? (
                    shoesData.map((el) => (
                            <ShoeCard key={el._id} productId={el._id} name={el.name} price={el.price} imageUrl={el.imageUrl} />
                         ))
                  ) : (
                     <div>No user Exist</div>
                           )}
                      </div>

                      <div className="pagination-div">

                          <div>{pageIndex ===1 ?
                             
                             <button style={colorSyle} onClick={()=>{handlePagination(1)}}>Page 1</button>
                             :
                             <button  onClick={()=>{handlePagination(1)}}>Page 1</button>
                               }</div>
                          <div> {pageIndex ===2 ?
                             
                             <button style={colorSyle} onClick={()=>{handlePagination(2)}}>Page 2</button>
                             :
                             <button  onClick={()=>{handlePagination(2)}}>Page 2</button>
                               }</div>

                      </div>

              </div>
    </div>

</div>
  )
}

export default Shoes