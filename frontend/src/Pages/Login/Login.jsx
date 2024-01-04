import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import "./Login.css"
import simage from "../../assets/login.jpg"
import { AuthContext } from '../../Context/AuthContext'


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {handleIsLoggedIn} = useContext(AuthContext);
  const navigate = useNavigate()
  

const handleLogin= async(e)=>{
  e.preventDefault();
  const user = {
    email: email,
    password: password
  };

  try {
    if(!email || !password){
      alert("Please enter both email and password")

    }else{
         localStorage.setItem("email",email)
   await fetch("http://localhost:4500/api/user/login",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
       }).then((res)=>{
         return res.json()
       }).then((data)=>{
         console.log(data)
         if(data.Token && data.Role!=="admin"){
          localStorage.setItem("shopin-token",data.Token)
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("shopinn-user-profile-image", data.avtar)
          handleIsLoggedIn()
          alert("user login succesfully")
       navigate("/")
         }else if(data.Token && data.Role==="admin"){
           console.log(data.Token, data.Role)
           localStorage.setItem("shopin-token",data.Token);
           alert("user login succesfully")
        navigate("/admin")
         }
       }).catch((error)=>{
        console.log(error)
       })
       
  
    }
        console.log("registration is Sucessful")  
        setEmail("")
        setPassword("")
        
  } catch (error) {
    
  }

}
  return (
    <div className='loin'>

      <div className="l-image">
        <img src={simage} alt="" />
      </div>
      <div className="l-form">

           <form id='lf' action="" onSubmit={handleLogin}>
              <h1>Log in to ShopInn</h1>
              <p>Enter your details below</p>
              <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
              <input type="password" name="" id="password" value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder='Password' />
              <div id='lf-di'>
              <button id='bt-3' type='submit'>Log In</button>
              <button id='bt-4' type='submit' > Forget Password? </button>
              </div>
              <div className="guest-user">
                 <button type='submit' onClick={()=>{setEmail("ironman@gmail.com"); setPassword("ironman12345")}} >SignIn as Guest</button>
              </div>
           </form>
      </div>
         
     

    </div>
  )
}

export default Login