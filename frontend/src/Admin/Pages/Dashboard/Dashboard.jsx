import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'

import "./Dashboard.css"
import Usercard from '../../Components/Usercard/Usercard'

function Dashboard() {

  useEffect(()=>{

     const getUserInfo = async()=>{

         try {
          const response = await axios.delete(
            `http://localhost:4500/api/admin/alluser`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("shopin-token")}`,
              },
      
              
            })
            console.log(response)
          
         } catch (error) {
          
         }
     }


  },[])



  return (
    <div className='dashboard-page'>
         <div className="dash-left">
                     
         </div>
         <div className="dash-right">

           <div className="top-info-div">
             <div>Totla Number of user</div>
             <div>Total Number of producst</div>
             <div> data</div>
           </div>
           <div className="main-detail-wrapper">
             <div>
               
               <Usercard />
             </div>
             <div></div>
             <div></div>

           </div>

     
         </div>
    </div>
  )
}

export default Dashboard