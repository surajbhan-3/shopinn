import React from 'react'
import "./Myorder.css"

function Myorder() {
  return (
    <div className='mo-main'>
               
               <div className="mo-title">
                 <h1>Order Details</h1>
               </div>
               <div className="mo-details">
                    <div>
                        <div className='iniq'>
                         <div>Item Name</div>
                          <div>Item Quantity</div>
                        </div>
                        <div className='iniq'>
                         <div>{"shoe name"}</div>
                          <div>{"1"}</div>
                        </div>
                        <div className='iniq'>
                         <div>Price</div>
                          <div>Item Quantity</div>
                        </div>
                        <div className='iniq'>
                         <div>Delivery Charges</div>
                          <div>Item Quantity</div>
                        </div>
                        <div className='iniq'>
                         <div>Discount</div>
                          <div>Item Quantity</div>
                        </div>
                        <div className='iniq'>
                         <div>Total Amount</div>
                          <div>Item Quantity</div>
                        </div>
                        <div className='iniq'>
                            <div>
                              Delivery Address
                            </div>
                        </div>
                        <div className='iniq'>
                        <div>Place order</div>
                        </div>
                    </div>                      
               </div>



    </div>
  )
}

export default Myorder