import React from 'react'
import { RiAppleLine } from "react-icons/ri";
import { AiOutlineAndroid } from "react-icons/ai";
import { LuCopyright } from "react-icons/lu";



import "./Footer.css"
function Footer() {
  return (
    <div className='main-footer'>

     <div className="footer-wrapper">
        <div className="f-div">
            <div>
                <h3>ShopInn</h3>
            </div>
            <div>
                <p id='subsc' >Subscribe</p>
            </div>
            <p>Get 10% of on first order</p>
            </div>
        <div className="f-div">
            <div>
                <h4>Support</h4>
            </div>
             <p>Mail us at <br />surajbhan2boaz@gmail.com</p>
             <p>+91 8920213684</p>
            </div>
        <div className="f-div">
            <div>
                <h4>Account</h4>
                <p>My Account</p>
                <p>Login/Register</p>
                <p>Cart</p>
                <p>Wishlist</p>
                <p>Shop</p>

            </div></div>
        <div className="f-div">
            <div>
                <h4>Quick Links</h4>
                <p>Privacy Policy</p>
                <p>Terms of Use</p>
                <p>FAQ</p>
                <p>Contact</p>

            </div>
            
            </div>
            <div className="f-div">
                <div>
                    <h4>Download App</h4>
                    <p> <RiAppleLine size={30} /> <br /> Apple</p>
                    <p><AiOutlineAndroid  size={30}/> <br /> Android</p>
                </div>
            </div>
     </div>

     <div id='hrwi' />

         <div className="copy">
            <LuCopyright /> 
            <div>Copyright shopinn 20023. All rights reseverd</div>
         </div>
    </div>
  )
}

export default Footer