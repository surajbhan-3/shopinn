import React from 'react'
import "./Shoes.css"

function Shoes({productId, name, avtar}) {

    //  Shoes: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop
  return (
    <div className='item-details-co' key={productId}>
    
           <div className="itemImage-div-a">
             <img src={avtar} alt="" />
           </div>
          <div className="itemname-div-a">
                <div>{name}</div>
          </div>
          <div className='makeChanges'>
             <button>make changes</button>
          </div>
       

    </div>
  )
}

export default Shoes