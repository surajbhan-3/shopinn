import React, { useEffect, useState } from 'react'
import "./Books.css"
import axios from 'axios'
import BookCard from '../../Component/BookCard/BookCard'
function Books() {
const [booksData, setBooksData]= useState([])

useEffect(()=>{

  const getBooksProducts = async()=>{

    try {
     const response = await axios.get(
       `http://localhost:4500/api/products/category/books`,
       {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("shopin-token")}`,
         },
  
         
       })
       console.log(response)
       setBooksData(response.data)
       console.log(response.data, "here shoes  data")
     
    } catch (error) {
      console.log(error)
    }
  }
  getBooksProducts()

},[])  
// console.log(booksData, "hey books data")

  
  return (
    <div className='main-books'>
           <div className="main-books-wrapper">

                     <div className="main-books-left">

                     </div>
                     <div className="main-books-right">
                           <div className="books-container">
                               
                               {booksData ? (
                           booksData.map((el) => (
                                   <BookCard key={el._id} productId={el._id} name={el.name} price={el.price} imageUrl={el.imageUrl} />
                                ))
                         ) : (
                            <div>No user Exist</div>
                                  )}
                             </div>

                     </div>
           </div>

    </div>
  )
}

export default Books