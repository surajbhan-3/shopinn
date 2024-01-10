import React from 'react'
import './Productupdate.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Productupdate() {

  const [productName, setProductName] = useState("")
  const [brandName, setBrandName] = useState("")
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("")
  const [gender, setGender] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription]= useState("")
  const [data, setData] = useState([])

 

  useEffect(()=>{
        const productId = localStorage.getItem("productId")
      const  getSingleProduct = async()=>{

                try {
                       const response = await axios.get(`http://localhost:4500/api/admin/product_details/${productId}`,
                       
                       {
                      
                        headers:{
                           Authorization:`Bearer ${localStorage.getItem("shopin-token")}`
                        }
                         
                       })
                       console.log(response, "hello this is respone")
                       setData(response.data)
                       setProductName(response.data.name)
                       setBrandName(response.data.brand)
                       setPrice(response.data.price)
                       setCategory(response.data.category)
                       setSubcategory(response.data.subcategory)
                       setDescription(response.data.description)
                       setGender(response.data.gender)
                } catch (error) {
                  console.log(error)
                }
        }
        getSingleProduct();
     
  },[])
  



const handleUploadImage = async(event)=>{
  event.preventDefault()

   
  

}

const handleUpdateProduct = async()=>{

  
}
const handleDelete = async () => {
      const productId = localStorage.getItem("productId")

  try {
    const response = await axios.delete(`http://localhost:4500/api/admin/product_details/${productId}`,
                       
                       {
                         
                        headers:{
                           Authorization:`Bearer ${localStorage.getItem("shopin-token")}`
                        },
                        data: productId
                        
                       })
                       console.log(response, "hello this is respone")
                     } catch (error) {
                        console.log(error)
    
                       }
      
}

const handleImagechange = async (event) =>{
  event.preventDefault()
  setSelectedFile(event.target.files[0])
}

  return (
  
    <div className='profile-main-section'>
           <div className="profile-user-section">
                  <div className='userProfile-wrapper'> 
                        <div className="userProfilePicture">
                         <img src= {data.imageUrl} alt="" />
                        </div>
                        <div className="userName">
                         <p>{data.name}</p>
                        </div>

                       <div className='updateImageButton'>
                          <input type="file" onChange={handleImagechange} />
                         <button onClick={handleUploadImage}>Update Image</button>
                       </div>

                  </div>
                   
           </div>
           <div className="updateProductInfo">

           <form action="" onSubmit={handleUpdateProduct} >
                 <h3>Update And Delete Products</h3>
                  <label htmlFor="">Product Name</label>
                   <input
                     required
                     type="text"
                     value={productName} 
                     onChange={(e)=>{setProductName(e.target.value)}} 
                     placeholder={productName? productName:null} 
                    />  {/*  empty string`""` is falsy value  */}
                  <label htmlFor="">Brand Name</label>
                  <input required type="text"
                     value={brandName} 
                     onChange={(e)=>{setBrandName(e.target.value)}} 
                     placeholder={brandName?brandName:null} 
                    />
                   <label htmlFor="">Description</label>
                     <textarea required name="" id="text-a" cols="30" rows="5" onChange={(e)=>{setDescription(e.target.value)}} 
                     maxLength={500}
                     placeholder={description?description:null} 
                     ></textarea>

                      <label htmlFor="">Price</label>
                  <input required type="number"
                     value={price} 
                     onChange={(e)=>{setBrandName(e.target.value)}} 
                     placeholder={price?price:null} 
                    />

                  

                     <label htmlFor="">Subcategory</label>
                  <input required type="text"
                     value={subcategory} 
                     onChange={(e)=>{setBrandName(e.target.value)}} 
                     placeholder={subcategory?subcategory:null} 
                    />

                       <label htmlFor="">Category</label>
                     <select required name="" id="" value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                      <option value="default">Choose category</option>
                       <option value="electronics">Electronics</option>
                       <option value="shoes">Shoes</option>
                       <option value="books">Books</option>
                     </select>
                  
                  
                  <label htmlFor="">Gender</label>
                  <select required name="" id="" value={gender} onChange={(e)=>{setGender(e.target.value)}}>
                   <option value="default">Choose Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unisex">unisex</option> 
                   </select> 
                    <div>
                      <button id='updateProductButton'>Update</button> 
                    
                    </div>
                                     
                 </form>
                  <div className='dele-div'>
                  <button onClick={handleDelete} id='deleteProductButton'>Delete</button>
                  </div>

                

                
           </div>
           <div className='fbottom'>

           </div>
    </div>
  )
}

export default Productupdate