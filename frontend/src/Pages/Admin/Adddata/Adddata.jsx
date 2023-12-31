import React from 'react'
import "./Adddata.css"
function Adddata() {
  return (
    <div className='main-add'>
            
            <form action="" id='add-data-form'>
              <label htmlFor="_id">Product Name</label>
              <input type="text"  />
              <label htmlFor="brand">Brand Name</label>
              <input type="text" />
              <label htmlFor="description">Description</label>
              <textarea name="" id="" cols="30" rows="10"></textarea>
              <label htmlFor="imageUrl">ImageUrl</label>
              <input type="text" />
              <label htmlFor="price">Price</label>
              <input type="number" />
              
            </form>
    </div>
  )
}

export default Adddata