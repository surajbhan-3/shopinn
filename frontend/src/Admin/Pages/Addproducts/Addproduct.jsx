import React from 'react'
import './Addproduct.css';
import axios from 'axios';
import { useState } from 'react';
import { Store } from 'react-notifications-component';
import PartLoader from '../../../Component/PartLoader/PartLoader';


function Addproduct() {
  // const isLoading = useSelector((state) => state.LoaderReducer.isLoading);
  const [productName, setProductName] = useState("")
  const [brandName, setBrandName] = useState("")
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("")
  const [gender, setGender] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription]= useState("")
  
  const [partLoader, setPartLoader]= useState(false)
  const isLoading = partLoader
 




  const handleImagechange = async (event) =>{
    event.preventDefault()
    setSelectedFile(event.target.files[0])
}

const handleAddProduct = async(event)=>{

       event.preventDefault()
       setPartLoader(true)
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
      if(response.data.status === "success"){
            setPartLoader(false)
        Store.addNotification({
          title: "Product Added",
          message: "Produc has been addedd",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true
          }
       
        });
        window.location.reload()

      }

          console.log(response)
    // Handle the uploaded URL (e.g., display the image)
  } catch (error) {
    console.error('Upload failed:', error);
    setPartLoader(false)
  }

};

console.log(productName, brandName, category, subcategory, gender, price, selectedFile)



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
                    <textarea name="" id="" cols="30" rows="5" onChange={(e)=>{setDescription(e.target.value)}} maxLength={500}></textarea>
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