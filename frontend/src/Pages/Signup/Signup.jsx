import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import "./Signup.css"
import simage from "../../assets/signup.avif"
import { Link } from "react-router-dom";
import PartLoader from '../../Component/PartLoader/PartLoader';
function Signup() {

  const {
           username, 
           emailSignup,
           passwordSignup,  
           setEmailSignup,  
           setPasswordSignup, 
           setUsername,
           handleSingupFormSubmit
        } = useContext(AuthContext);

  return (
      <div id='sign_up' className='sign_up'>

            <div className="s-image">
              <img src={simage} alt="" />
            </div>
            <div className="s-form">

                <form action="" id='sform-form' onSubmit={handleSingupFormSubmit}>
                    <h1>Create an account</h1>
                    <p>Enter your details below</p>
                    <input type="text" maxLength={50}  placeholder='Name' id='username' name='username' value={username} onChange={(e)=> setUsername(e.target.value)} required />
                    <input type="email" max={50} placeholder='Email' id='email' name='email' value={emailSignup} onChange={(e)=> setEmailSignup(e.target.value)}  required/>
                    <input type="password" maxLength={50} required name="password" id="password" value={passwordSignup} onChange={(e)=> setPasswordSignup(e.target.value)}  placeholder='Password' />
                    <button id='bt-1' type='submit'>Create Account</button>     
                </form>
                       {/* <button id='bt-2' >  
                            for google oauth
                       </button> */}
                       <div>
                       </div>

                       <div id='rlog'>Already have account? <button id='lin'>  <Link className='idl' to="/login">Log in</Link></button></div>

            </div>
         
     

      </div>
  )
}

export default Signup