import React from 'react'
import "./Shoes.css"
import {useNavigate} from "react-router"

function Books({productId, name, avtar}) {

  const navigate = useNavigate()
  const handleMakeChange = async () =>{
             localStorage.setItem("productId", productId)
                  
             navigate("/admin/product_changes")
  }
    //  Books: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop
  return (
    <div className='item-details-co' key={productId}>
    
           <div className="itemImage-div-a">
             <img src={avtar} alt="" />
           </div>
          <div className="itemname-div-a">
                <div>{name}</div>
          </div>
          <div className='makeChanges'>
             <button onClick={handleMakeChange}>make changes</button>
          </div>
       

    </div>
  )
}

export default Books