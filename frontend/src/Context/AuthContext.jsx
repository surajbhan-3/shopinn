
import {useState, createContext} from "react";
import { useNavigate } from 'react-router'
import { useDispatch } from "react-redux";
import { AUTH_BASE_URL } from "../Config/apiConfig";
import { Store } from 'react-notifications-component';
import axios from "axios";
import { addCartdataTocartItemsAndCount } from "../Redux/ProductReducer/Action";
export const AuthContext = createContext();



export const AuthContextProvider = ({children})=>{
            const navigate = useNavigate()
            const dispatch = useDispatch()
            const [emailLogin, setEmailLogin] = useState("");
            const [passwordLogin, setPasswordLogin] = useState("");
            const [emailSignup, setEmailSignup] = useState("");
            const [passwordSignup, setPasswordSignup] = useState("");
            const [username, setUsername] = useState("");
            // setting the state of user is logged in or not
            const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem("isLoggedIn"));

            // function for changing the `isLoggIn` state
            const handleIsLoggedIn = () => {
                                            setLoggedIn(true)
                                            localStorage.setItem('isLoggedIn', 'true');
                                        }
            // function for changing the `isLoggedIn` state and remove important keys related to user and user logout
            const handleIsLoggedOut = () => {
                                                setLoggedIn(false);
                                                localStorage.removeItem("isLoggedIn")
                                                localStorage.removeItem("shopin-token")
                                                localStorage.removeItem("shopinn-user-profile-image");
                                                localStorage.removeItem("token")
                                                localStorage.removeItem("email");
                                                localStorage.removeItem("userId")
                                                localStorage.removeItem("persist:persist-key")
                                             }




            const handleLoginFormSubmit = async (e) => {
                              e.preventDefault();
                              const user = {  email: emailLogin, password: passwordLogin  };
             
               try {
                 
                      localStorage.setItem("email",emailLogin)
                      await fetch(`${AUTH_BASE_URL}/api/user/login`,{
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
                       Store.addNotification({
                        title: "Login",
                        message: "User LoggedIn Successfully",
                        type: "success",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                          duration: 2000,
                          onScreen: true
                        }
                     
                      });
                      dispatch(addCartdataTocartItemsAndCount())
                    navigate("/")
                      }else if(data.Token && data.Role==="admin"){
                        console.log(data.Token, data.Role)
                        localStorage.setItem("shopin-token",data.Token);
                        localStorage.setItem("userId", data.userId);
                        localStorage.setItem("shopinn-user-profile-image", data.avtar)
                       
                        Store.addNotification({
                            title: "Login",
                            message: "Admin LoggedIn Successfully",
                            type: "success",
                            insert: "top",
                            container: "top-right",
                            animationIn: ["animate__animated", "animate__fadeIn"],
                            animationOut: ["animate__animated", "animate__fadeOut"],
                            dismiss: {
                              duration: 2000,
                              onScreen: true
                            }
                         
                          });
                        handleIsLoggedIn()
                     navigate("/admin")
                      }
                    }).catch((error)=>{
                     console.log(error)
                    })
                    
               
                 
                     console.log("registration is Sucessful")  
                     setEmailLogin("")
                     setPasswordLogin("")
                     
               } catch (error) {
                 
               }                       
                                              
                                              }                                



            const handleGuestLogin  = async ()=>{
        
                setEmailLogin("ironman@gmail.com")
                setPasswordLogin("ironman12345")
                    const user = {
                      email: emailLogin,
                      password: passwordLogin
                    };
                  
                    try {
                     
                           localStorage.setItem("email",emailLogin)
                     await fetch(`${AUTH_BASE_URL}/api/user/login`,{
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
                            Store.addNotification({
                                title: "Login",
                                message: "User LoggedIn Successfully",
                                type: "success",
                                insert: "top",
                                container: "top-right",
                                animationIn: ["animate__animated", "animate__fadeIn"],
                                animationOut: ["animate__animated", "animate__fadeOut"],
                                dismiss: {
                                  duration: 2000,
                                  onScreen: true
                                }
                             
                              });
                              dispatch(addCartdataTocartItemsAndCount())
                         navigate("/")
                           }else if(data.Token && data.Role==="admin"){
                             console.log(data.Token, data.Role)
                             localStorage.setItem("shopin-token",data.Token);
                             localStorage.setItem("userId", data.userId);
                             localStorage.setItem("shopinn-user-profile-image", data.avtar)
                             alert("user login succesfully")
                             handleIsLoggedIn()
                             dispatch(addCartdataTocartItemsAndCount())
                          navigate("/admin")
                           }
                         }).catch((error)=>{
                          console.log(error)
                         })
                         
                    
                      
                          console.log("registration is Sucessful")  
                          setEmailLogin("")
                          setPasswordLogin("")
                          
                    } catch (error) {
                      
                    }
                  
                  
            }
            
            

            const handleSingupFormSubmit = async(e)=>{
                e.preventDefault();
            
                const user = {
                  username: username,
                  email: emailSignup,
                  password: passwordSignup
                };
            
                try {
                     const response = await fetch(`${AUTH_BASE_URL}/api/user/register`,{
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
                        setEmailSignup("")
                        setPasswordSignup("")
                        Store.addNotification({
                            title: "User registered",
                            message: "User  Successfully Registered",
                            type: "success",
                            insert: "top",
                            container: "top-right",
                            animationIn: ["animate__animated", "animate__fadeIn"],
                            animationOut: ["animate__animated", "animate__fadeOut"],
                            dismiss: {
                              duration: 2000,
                              onScreen: true
                            }
                         
                          });
                        navigate("/login")
                } catch (error) {
                  console.error('There was a problem with the registration:', error);
                  
                }
            
            
              }


            const handleUserLogout = async () =>{
                try {
                    const response = await axios.post(`${AUTH_BASE_URL}/api/user/logout`,
                    {}, 
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("shopin-token")}`,
                      },
                    }
                    
                    )
                    console.log(response)
                    if(response.status === 200){
             
                      Store.addNotification({
                        title: "User Logout",
                        message: "User successfully logout",
                        type: "success",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                          duration: 2000,
                          onScreen: true
                        }
                     
                      });
                      handleIsLoggedOut()
                      window.location.reload()
                    }
                    
                 } catch (error) {
                  console.log(error)
                 }
            }  
                       
            return  <AuthContext.Provider value={{ isLoggedIn, 
            handleIsLoggedIn, handleIsLoggedOut, emailLogin, passwordLogin ,emailSignup, passwordSignup,
             setEmailLogin, setPasswordLogin,
            setEmailSignup, setPasswordSignup, setUsername, 
             handleLoginFormSubmit, handleGuestLogin, handleSingupFormSubmit, handleUserLogout }} >
                
                        {children}

                    </AuthContext.Provider>


        }




