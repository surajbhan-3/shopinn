import React from 'react'
import './Addproduct.css';
import { useState } from 'react';


function Productupdate() {

  const [productName, setProductName] = useState("")
  const [brandName, setBrandName] = useState("")
  const [gender, setGender] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  


const handleAddProduct = async()=>{



}

const handleImagechange = async (event) =>{
  event.preventDefault()
  setSelectedFile(event.target.files[0])
}

  return (
    <div className='main-addproduct-container'>

          <div className='addproductDetails-div' >
          <form action="" onSubmit={handleAddProduct} >
                 <h3>Update And Delete Products</h3>
                  <label htmlFor="">Product Name</label>
                   <input
                     type="text"
                     value={productName} 
                     onChange={(e)=>{setProductName(e.target.value)}} 
                     placeholder={productName? productName:"Enter Your Product Name"} 
                    />  {/*  empty string`""` is falsy value  */}
                  <label htmlFor="">Brand Name</label>
                  <input type="text"
                     value={brandName} 
                     onChange={(e)=>{setBrandName(e.target.value)}} 
                     placeholder={brandName?brandName:"Enter Your Brand Name"} 
                    />
                      <label htmlFor="">Price</label>
                  <input type="number"
                     value={brandName} 
                     onChange={(e)=>{setBrandName(e.target.value)}} 
                     placeholder={brandName?brandName:"Enter Your Brand Name"} 
                    />

                    <label htmlFor="">Category</label>
                     <select name="" id="">
                       <option value="electronics">Electronics</option>
                       <option value="shoes">Shoes</option>
                       <option value="books">Books</option>
                     </select>

                     <label htmlFor="">Subcategory</label>
                  <input type="text"
                     value={brandName} 
                     onChange={(e)=>{setBrandName(e.target.value)}} 
                     placeholder={brandName?brandName:"Enter Your Brand Name"} 
                    />

                <label htmlFor="">Gender</label>
                   <select name="" id="">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                   </select>

                  
                  
                  <label htmlFor="">Gender</label>
                   <input type="text" value={gender} onChange={(e)=>{setGender(e.target.value)}} placeholder={gender?gender:"Enter Your Gender"} /> 
                   <input type="file" onChange={handleImagechange} />
                   <button id="updateProfileButton">Add Product</button>
                 </form>


          </div>





    </div>
  )
}

export default Productupdate