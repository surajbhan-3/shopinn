import React from 'react'
import './Productupdate.css';
import { useContext } from 'react';
import { AdminContext } from '../../../Context/AdminContext';
import PartLoader from '../../../Component/PartLoader/PartLoader';
function Productupdate() {

  const {
         productName,    brandName,    price,     category,    subcategory,    gender, selectedFile, description,
         setProductName, setBrandName, setPrice,  setCategory, setSubcategory, setGender, setSelectedFile, setDescription,
         handleDeleteProduct, handleUpdateProduct, handleImagechange, handleUdateProductImage, data, setData, isLoading
         
     } = useContext(AdminContext)


  return (
  
    <div className='profile-main-section'>
           {isLoading?<PartLoader />:
             <React.Fragment>
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
                         <button onClick={handleUdateProductImage}>Update Image</button>
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
                         <label htmlFor="">Price</label>
                  <input required type="number"
                     value={price} 
                     onChange={(e)=>{setPrice(e.target.value)}} 
                     placeholder={price?price:null} 
                    />

                   <label htmlFor="">Description</label>
                     <textarea required name="" value={description} id="text-a" cols="30" rows="5" onChange={(e)=>{setDescription(e.target.value)}} 
                     maxLength={500}
                     placeholder={description?description:null} 
                     ></textarea>

                 
                  
                    <label htmlFor="">Category</label>
                     <select required name="" id="" value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                      <option value="default">Choose category</option>
                       <option value="electronics">Electronics</option>
                       <option value="shoes">Shoes</option>
                       <option value="books">Books</option>
                     </select>

                     <label htmlFor="">Subcategory</label>
                  <input required type="text"
                     value={subcategory} 
                     onChange={(e)=>{setSubcategory(e.target.value)}} 
                     placeholder={subcategory?subcategory:null} 
                    />

                    
                  
                  
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
                  <button onClick={handleDeleteProduct} id='deleteProductButton'>Delete</button>
                  </div>

                

                
           </div>
           <div className='fbottom'>

           </div>
             </React.Fragment>
           }
    </div>
  )
}

export default Productupdate