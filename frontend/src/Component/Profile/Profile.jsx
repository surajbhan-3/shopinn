import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import apiService from '../../Config/apiService'
import "./Profile.css"

function Profile() {
  const inputStyle = {
    width: '30%',
    margin:'0%',
    marginLeft:'10%'
  };
  const [data, setData] = useState([])
  const [secondaryData, setSecondaryData] = useState([])
  const [addressData, setAddressData] = useState([])
  const [selectedFile, setSelectedFile] = useState(null);
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [dateOfBirth, setDateofBirth] = useState("")
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalcode]= useState("");
  const [landmark, setLandmark]= useState("");


  const handleImagechange = async (event) =>{
        event.preventDefault()
        setSelectedFile(event.target.files[0])
  }

  useEffect(()=>{
    const getUserDetails = async () => {
      try {
        const response = await apiService.get(
          `/user/settings/`,
        );
        setData(response.data.userData);
        setSecondaryData(response.data.userSecondaryDetails)
        setAddressData(response.data.userAddressDetails)
        // console.log(secondaryData, "hey tehre secondary data here") // due to asycchronous 

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
  if (addressData && addressData.length > 0) {
    setAddress(addressData[0].address);
    setCity(addressData[0].city);
    setPostalcode(addressData[0].postalCode);
    setLandmark(addressData[0].landmark);
  }
 }, [
     secondaryData,
     setFirstname,
     setLastname,
     setDateofBirth, 
     setGender, 
     addressData,
     setAddress,
     setCity,
     setPostalcode,
     setLandmark
    ]); // dependencies 


  const handleUploadImage = async () =>{

    try {
      const userId =localStorage.getItem("userId")
      const formData = new FormData();
      formData.append('avtar', selectedFile);

      const response = await apiService.post(`/user/profile_picture/${userId}`, formData);

      // Handle the uploaded URL (e.g., display the image)
    } catch (error) {
      console.error('Upload failed:', error);
    }
       
  }




  const handleUpdateProfileInfo = async (e) =>{
         e.preventDefault()


        try {
          
          const response = await apiService.patch(
            `/user/update_profile_info`,
            {
              
                firstname,
                lastname,
                gender,
                dateOfBirth
            
            }
        
            
          );

        } catch (error) {
          console.log(error)
          
        }

        
  }


  const handleUpdateAddressInfo = async (e) =>{
    e.preventDefault()


   try {
     
     const response = await apiService.patch(
       `/api/user/update_address_info`,
       {
         
           address,
           city,
           postalCode,
           landmark
       
       }
       
     );
  
   } catch (error) {
     console.log(error)
     
   }

   
}




 


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
                     placeholder={firstname? firstname:"Enter Your First Name"} 
                    />  {/*  empty string`""` is falsy value  */}
                  <label htmlFor="">Last Name</label>
                  <input type="text"
                     value={lastname} 
                     onChange={(e)=>{setLastname(e.target.value)}} 
                     placeholder={lastname?lastname:"Enter Your Last Name"} 
                    />

                  <label htmlFor="">Date Of Birth</label>
                   <input  type="date" 
                          name="" id="" value={dateOfBirth} 
                        onChange={(e)=>{setDateofBirth(e.target.value)}} 
                       max={(new Date()).toISOString().split('T')[0]} 
                   
                    />
                  
                  <label htmlFor="">Gender</label>
                   <input type="text" value={gender} onChange={(e)=>{setGender(e.target.value)}} placeholder={gender?gender:"Enter Your Gender"} /> 
          
                   <button id="updateProfileButton">Update Profile</button>
                 </form>

                 <form action="" onSubmit={handleUpdateAddressInfo}>
                   <h3>Edit Address</h3>
                   <label htmlFor="">Adress</label>
                   <input type="text" maxLength={100} value={address}
                    onChange={(e)=>{setAddress(e.target.value)}} 
                    placeholder={address?address:"Enter your addres"} />
               
                   <label htmlFor="">City</label>
                   <input type="text" maxLength={20}
                    value={city} onChange={(e)=>{setCity(e.target.value)}}
                     placeholder={"Enter city name"} />

                   <label htmlFor="">Postal code</label>
                   <input type="text" maxLength={6} value={postalCode}
                   onChange={(e)=>{setPostalcode(e.target.value)}} 
                   placeholder={postalCode?postalCode:"Enter six digit pin"} />
                   
                   <label htmlFor=""  >Landmark</label>
                   <input type="text" maxLength={20} 
                   value={landmark} onChange={(e)=>{setLandmark(e.target.value)}} 
                   name="" id="" placeholder={landmark?landmark:"Enter landmark"} />

                   <button id="updateAddressButton">Update Address</button>
                 </form>
           </div>
           <div className='fbottom'>

           </div>
    </div>
  )
}

export default Profile