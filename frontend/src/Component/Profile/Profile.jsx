import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import "./Profile.css"

function Profile() {

  const [data, setData] = useState([])
  const [secondaryData, setSecondaryData] = useState([])
  const [selectedFile, setSelectedFile] = useState(null);
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [dateOfBirth, setDateofBirth] = useState("")
  const [gender, setGender] = useState("")


  const handleImagechange = async (event) =>{
        event.preventDefault()
        setSelectedFile(event.target.files[0])

  }

  useEffect(()=>{
    const getUserDetails = async () => {
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
        console.log(response.data.userSecondaryDetails, "hello herere posdf")
        setData(response.data.userData);
        setSecondaryData(response.data.userSecondaryDetails)
        console.log(secondaryData, "hey tehre secondary data here") // due to asycchronous 
        
        // setSecondaryData({firstname:"sureaj"})

      } catch (error) {
        console.error("Error fetching data:", error.response || error);
        // Handle errors (e.g., set error state)
      }
    };
  
    getUserDetails();

 
     

  },[])

  useEffect(() => {
    // Use secondaryData here or perform actions based on its changes 
    // asynchronums behaviour 
    if (secondaryData && secondaryData.length > 0) {
      setFirstname(secondaryData[0].firstname);
      setLastname(secondaryData[0].lastname);
      setDateofBirth(secondaryData[0].dateOfBirth);
      setGender(secondaryData[0].gender);
  }
}, [secondaryData,setFirstname,setLastname, setDateofBirth, setGender]); // dependencies 

console.log(secondaryData.length, "hey length here")
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




  const handleUpdateProfileInfo = async (e) =>{
         e.preventDefault()

        console.log(firstname,lastname, dateOfBirth, gender, "hello gys ")

        try {
          
          const response = await axios.patch(
            `http://localhost:4500/api/user/update_profile_info`,
            {
              
                firstname,
                lastname,
                gender,
                dateOfBirth
            
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("shopin-token")}`,
              },
        
            }
            
          );
        console.log(response)
        } catch (error) {
          console.log(error)
          
        }

        
  }


  const inputStyle = {
    width: '30%',
    margin:'0%',
    marginLeft:'10%'
  };
  console.log(firstname,lastname,dateOfBirth,gender, "haey tehre")

  console.log(data, "this is data ")
  console.log(data.username, "userdata")
  return (
    <div className='profile-main-section'>
           <div className="profile-user-section">
                  <div className='userProfile-wrapper'> 
                        <div className="userProfilePicture">
                         <img src= {data.avtar} alt="" />
                        </div>
                        <div className="userName">
                         <p>{data.username}</p>
                        </div>

                       <div className='updateImageButton'>
                          <input type="file" onChange={handleImagechange} />
                         <button onClick={handleUploadImage}>Update Image</button>
                       </div>

                  </div>
                   
           </div>
           <div className="updateProfileSection">

                 <form action="" onSubmit={handleUpdateProfileInfo} >
                 <h3>Edit Profile</h3>
                  <label htmlFor="">First Name</label>
                   <input
                     type="text"
                    value={firstname} 
                    onChange={(e)=>{setFirstname(e.target.value)}} 
                    placeholder={secondaryData.length>0 ? secondaryData[0].firstname:"Enter Your First Name"} />
                  <label htmlFor="">Last Name</label>
                  <input type="text" value={lastname} onChange={(e)=>{setLastname(e.target.value)}} placeholder={secondaryData.length==0? "Enter Your Last Name":secondaryData[0].lastname} />
                  <label htmlFor="">Date Of Birth</label>
                   <div className="date-div">
                    <span>{secondaryData.length>0 ? secondaryData[0].dateOfBirth:"Select your dob"}</span>
                   <input style={inputStyle}  type="date" name="" id="date-id" value={dateOfBirth} 
                   onChange={(e)=>{setDateofBirth(e.target.value)}} 
                   max={(new Date()).toISOString().split('T')[0]} 
                   
                  />
                   </div>
                  
                  <label htmlFor="">Gender</label>
                   <input type="text" value={gender} onChange={(e)=>{setGender(e.target.value)}} placeholder={secondaryData.length==0? "Enter Your Last Name":secondaryData[0].gender} /> 
          
                   <button id="updateProfileButton">Update Profile</button>
                 </form>

                 <form action="">
                   <h3>Edit Address</h3>
                   <label htmlFor="">Adress line 1</label>
                   <input type="text" placeholder='' />
                   <label htmlFor="">Adress line2</label>
                   <input type="text" placeholder='' />
                   <label htmlFor="">City</label>
                   <label htmlFor="">Postal code</label>
                   <input type="text" maxLength={6} />
                 </form>
           </div>
           <div className='fbottom'>

           </div>
    </div>
  )
}

export default Profile