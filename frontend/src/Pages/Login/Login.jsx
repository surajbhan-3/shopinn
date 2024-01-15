import React from 'react'
import { useContext } from 'react'
import "./Login.css"
import simage from "../../assets/login.jpg"
import { AuthContext } from '../../Context/AuthContext'
import PartLoader from '../../Component/PartLoader/PartLoader'


function Login() {
  const {
          handleLoginFormSubmit,
          emailLogin,
          passwordLogin,
          setPasswordLogin,
          setEmailLogin,
          handleGuestLogin,
          isLoading
        } = useContext(AuthContext);

  return (
       <div className='loin'>
            
           {isLoading?<PartLoader />: <React.Fragment>


          <div className="l-image">
            <img src={simage} alt="" />
          </div>

          <div className="l-form">

              <form id='lf' action="" onSubmit={handleLoginFormSubmit}>
                  <h1>Log in to ShopInn</h1>
                  <p>Enter your details below</p>
                  <input type="email" required placeholder='Email : For easy access try as guest login' value={emailLogin} onChange={(e)=>setEmailLogin(e.target.value)} />
                  <input type="password" required name="" id="password" value={passwordLogin}  onChange={(e)=>setPasswordLogin(e.target.value)} placeholder='Password' />
                  <div id='lf-di'>
                  <button id='bt-3' type='submit'>Log In</button>
                  <button id='bt-4' type='submit' > Forget Password? </button>
                  </div>
                  <div className="guest-user">
                    <button  onClick={handleGuestLogin} >SignIn as Guest</button>
                  </div>
              </form>
          </div>
         
           </React.Fragment> }
     

       </div>
  )
}

export default Login