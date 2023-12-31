import React from 'react'
import "./Admin.css"
import AddData from '././Adddata/Adddata'
import Deletedata from './Deletedata/Deletedata'
function Admin() {
  return (
    <div className='main-admin'>
     <div className="left-side">
       <AddData />
       <Deletedata />
     </div>

     <div className="right-side">

     </div>
         
    </div>
  )
}

export default Admin