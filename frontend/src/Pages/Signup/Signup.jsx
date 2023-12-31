import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Signup.css"
import simage from "../../assets/signup.avif"
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function Signup() {

  const [username, setUsername]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  





  const handleSubmit = async(e)=>{
    e.preventDefault();

    const user = {
      username: username,
      email: email,
      password: password
    };

    try {
         const response = await fetch("http://localhost:4500/api/user/register",{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(user)
         })

         if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
            console.log("registration is Sucessful")  
            setUsername("")
            setEmail("")
            setPassword("")
            alert("user register succesfully")
            navigate("/login")
    } catch (error) {
      console.error('There was a problem with the registration:', error);
      
    }


  }

  return (
    <div className='sign_up'>

      <div className="s-image">
        <img src={simage} alt="" />
      </div>
      <div className="s-form">

           <form action="" id='sform-form' onSubmit={handleSubmit}>
              <h1>Create an account</h1>
              <p>Enter your details below</p>

              <input type="text" placeholder='Name' id='username' name='username' value={username} onChange={(e)=> setUsername(e.target.value)} required />
              <input type="email" placeholder='Email' id='email' name='email' value={email} onChange={(e)=> setEmail(e.target.value)}  required/>
              <input type="password" name="password" id="password" value={password} onChange={(e)=> setPassword(e.target.value)}  placeholder='Password' />
              <button id='bt-1' type='submit'>Create Account</button>
              <button id='bt-2' >  <div  id='fc' ><FcGoogle size={30}/></div> <div> Sign up with Google</div></button>
              <div>Already have account? <button id='lin'>  <Link to="/login">Log in</Link></button></div>
           </form>
      </div>
         
     

    </div>
  )
}

export default Signup