import React, { useEffect } from 'react'
import './Addproduct.css';
import { useContext } from 'react';
import PartLoader from '../../../Component/PartLoader/PartLoader';
import { AdminContext } from '../../../Context/AdminContext';


function Addproduct() {
   const {
    handleImagechange, handleAddProduct,productName, setProductName, brandName, setBrandName,setCategory,
    description, setDescription, setGender, price, setPrice,
    subcategory, setSubcategory, isLoading
  
  } = useContext(AdminContext);

  
  useEffect(()=>{
    setBrandName("")
    setProductName("")
    setCategory("")
    setPrice("")
    setSubcategory("")
    setDescription("")
    

  },[])

  return (
    <div className='main-addproduct-container'>

         {isLoading?<PartLoader />:
         
         <div className='addproductDetails-div' >
         <form action=""  onSubmit={handleAddProduct} >
                <h3>Add Products</h3>
                 <label htmlFor="">Product Name</label>
                  <input
                    type="text"
                     required
                    value={productName} 
                    maxLength={15}
                    onChange={(e)=>{setProductName(e.target.value)}} 
                    placeholder={"Enter Your Product Name"} 
                   />  {/*  empty string`""` is falsy value  */}
                 <label htmlFor="">Brand Name</label>
                 <input type="text"
                    value={brandName} 
                    required
                    maxLength={15}
                    onChange={(e)=>{setBrandName(e.target.value)}} 
                    placeholder={"Enter Your Brand Name"} 
                   />
                     <label htmlFor="">Price</label>
                 <input type="number"
                    value={price} 
                    required
                    maxLength={10}
                    onChange={(e)=>{setPrice(e.target.value)}} 
                    placeholder={"Enter Your Price"} 
                   />

                   <label htmlFor="">Description</label>
                    <textarea name="" id="" cols="30"  value={description} rows="5" onChange={(e)=>{setDescription(e.target.value)}} maxLength={500}></textarea>
                   <label htmlFor="">Category</label>
                    <select name="" required id="cct" onChange={(e)=>{setCategory(e.target.value)}}>
                     <option value="default">Choose category</option>
                      <option value="electronics">Electronics</option>
                      <option value="shoes">Shoes</option>
                      <option value="books">Books</option>
                    </select>

                    <label htmlFor="">Subcategory</label>
                 <input type="text"
                    value={subcategory} 
                    required
                    maxLength={15}
                    onChange={(e)=>{setSubcategory(e.target.value)}} 
                    placeholder={"Enter Your subcategory name"} 
                   />

               <label htmlFor="">Gender</label>
                  <select name="gender" required id="cctt" onChange={(e)=>{setGender(e.target.value)}}>
                  <option value="default">Choose Gender</option>
                   <option value="male">Male</option>
                   <option value="female">Female</option>
                   <option value="unisex">unisex</option> 
                  </select>

                 
                  <input required type="file" onChange={handleImagechange} />
                  <button id="updateProfileButton">Add Product</button>
                </form>


         </div>
         }





    </div>
  )
}

export default Addproduct