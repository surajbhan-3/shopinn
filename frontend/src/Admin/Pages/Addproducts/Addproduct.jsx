import React from 'react'
import './Addproduct.css';
import axios from 'axios';
import { useState } from 'react';


function Addproduct() {

  const [productName, setProductName] = useState("")
  const [brandName, setBrandName] = useState("")
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("")
  const [gender, setGender] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription]= useState("")
  



  const handleImagechange = async (event) =>{
    event.preventDefault()
    setSelectedFile(event.target.files[0])
}

const handleAddProduct = async(event)=>{

       event.preventDefault()
  try {
    const formData = new FormData();
    formData.append('avtar', selectedFile);
    formData.append('productName', productName)
    formData.append('productBrand', brandName)
    formData.append("description", description)
    formData.append('price', price)
    formData.append('category', category)
    formData.append('subcategory', subcategory)
    formData.append('gender', gender)

    const response = await axios.post(`http://localhost:4500/api/admin/add_product`,formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("shopin-token")}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Uploaded URL:', response.data.url);
    // Handle the uploaded URL (e.g., display the image)
  } catch (error) {
    console.error('Upload failed:', error);
  }

};

console.log(productName, brandName, category, subcategory, gender, price, selectedFile)



  return (
    <div className='main-addproduct-container'>

          <div className='addproductDetails-div' >
          <form action=""  onSubmit={handleAddProduct} >
                 <h3>Add Products</h3>
                  <label htmlFor="">Product Name</label>
                   <input
                     type="text"
              
                     value={productName} 
                     maxLength={15}
                     onChange={(e)=>{setProductName(e.target.value)}} 
                     placeholder={"Enter Your Product Name"} 
                    />  {/*  empty string`""` is falsy value  */}
                  <label htmlFor="">Brand Name</label>
                  <input type="text"
                     value={brandName} 
                
                     maxLength={15}
                     onChange={(e)=>{setBrandName(e.target.value)}} 
                     placeholder={"Enter Your Brand Name"} 
                    />
                      <label htmlFor="">Price</label>
                  <input type="number"
                     value={price} 
                     maxLength={10}
                     onChange={(e)=>{setPrice(e.target.value)}} 
                     placeholder={"Enter Your Brand Name"} 
                    />

                    <label htmlFor="">Description</label>
                     <textarea name="" id="" cols="30" rows="5" onChange={(e)=>{setDescription(e.target.value)}} maxLength={500}></textarea>
                    <label htmlFor="">Category</label>
                     <select name="" id="" onChange={(e)=>{setCategory(e.target.value)}}>
                      <option value="default">Choose category</option>
                       <option value="electronics">Electronics</option>
                       <option value="shoes">Shoes</option>
                       <option value="books">Books</option>
                     </select>

                     <label htmlFor="">Subcategory</label>
                  <input type="text"
                     value={subcategory} 
                     maxLength={15}
                     onChange={(e)=>{setSubcategory(e.target.value)}} 
                     placeholder={"Enter Your Brand Name"} 
                    />

                <label htmlFor="">Gender</label>
                   <select name="" id="" onChange={(e)=>{setGender(e.target.value)}}>
                   <option value="default">Choose Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unisex">unisex</option> 
                   </select>

                  
                   <input type="file" onChange={handleImagechange} />
                   <button id="updateProfileButton">Add Product</button>
                 </form>


          </div>





    </div>
  )
}

export default Addproduct