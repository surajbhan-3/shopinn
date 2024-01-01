import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import "./Profile.css"

function Profile() {

  const [data, setData] = useState([])
  const [secondaryData, setSecondaryData] = useState([])
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImagechange = async (event) =>{
        event.preventDefault()
        setSelectedFile(event.target.files[0])

  }

  useEffect(()=>{
    const getSingleProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4500/api/user/settings/`,
          {
            userId:localStorage.getItem("userId"),
            headers: {
              Authorization: `Bearer ${localStorage.getItem("shopin-token")}`,
            },
          },
          
        );
        console.log(response);
        console.log(response.data.userAddressDetails)
        setData(response.data.userData);
        setSecondaryData(response.data.userSecondaryDetails)
        // setSecondaryData({firstname:"sureaj"})

      } catch (error) {
        console.error("Error fetching data:", error.response || error);
        // Handle errors (e.g., set error state)
      }
    };
  
    getSingleProduct();

 
     

  },[])

  const handleUploadImage = async () =>{

    try {
      const userId =localStorage.getItem("userId")
      const formData = new FormData();
      formData.append('avtar', selectedFile);

      const response = await axios.post(`http://localhost:4500/api/user/profile_picture/${userId}`, formData, {
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
       
  }
  console.log(data, "this is data ")
  console.log(data.username, "userdata")
  return (
    <div className='profile-main-section'>
           <div className="profile-user-section">
               
               
                  
                    <div> 
                       <div className="userProfilePicture">
                         <img src= {data.avtar} alt="" />
                     
                       </div>
                       <div className="userName">
                         <p>{data.username}</p>
                       </div>

                       <div>
                       <input type="file" onChange={handleImagechange} />
                         <button onClick={handleUploadImage}>Update Image</button>
                       </div>

                  </div>
                   
                
               
           </div>
           <div className="updateProfileSection">

                 <form action="">
                  <label htmlFor="">Firstname</label>
                   <input type="text" placeholder={secondaryData.length==0? "Enter Your First Name":secondaryData.firstname} />
                  <label htmlFor="">Lastname</label>
                  <input type="text" placeholder={secondaryData.length==0? "Enter Your Last Name":secondaryData.firstname} />
                  <label htmlFor="">Date Of Birth</label>
                   <input type="date" name="" id="" placeholder='ssdf' />
                  <label htmlFor="">Gender</label>
                   <input type="text" placeholder='Gender'/> 
                 </form>

                 <form action="">
                   <h1>Edit Address</h1>
                   <label htmlFor="">Adress line 1</label>
                   <input type="text" placeholder='' />
                   <label htmlFor="">Adress line2</label>
                   <input type="text" placeholder='' />
                   <label htmlFor="">City</label>
                   <label htmlFor="">Postal code</label>
                   <input type="text" maxLength={6} />
                 </form>
           </div>
    </div>
  )
}

export default Profile