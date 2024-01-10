import React from 'react'
import "./Usercard.css"

function Usercard({userId, name, avtar}) {
  return (
    <div className='user-details-co' key={userId}>
    
           <div className="userimage-div-a">
             <img src={avtar} alt="" />
           </div>
          <div className="username-div-a">
               <p>{name}</p>
          </div>
       

    </div>
  )
}

export default Usercard