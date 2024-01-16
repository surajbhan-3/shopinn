
import {useState, createContext} from "react";
import { useNavigate } from 'react-router'
import { useDispatch } from "react-redux";
import { AUTH_BASE_URL} from "../Config/apiConfig";
import { Store } from 'react-notifications-component';
import axios from "axios";
import apiService from "../Config/apiService";
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
            const [partLoader, setPartLoader] = useState(false)
             const isLoading = partLoader

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
            
              setPartLoader(true);
              const user = { email: emailLogin, password: passwordLogin };
            
              try {
                localStorage.setItem("email", emailLogin);
            
                const response = await fetch(`${AUTH_BASE_URL}/api/user/login`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(user)
                });
                 
                const data = await response.json();
            
               

                if(data.status === "failed"){
                  Store.addNotification({
                    title: "Login Failed",
                    message: "Wrong Credential",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 2000,
                      onScreen: true
                    }
                  });
                  setPartLoader(false)
                  navigate("/login")
                 }
            
                if (data.Token && data.Role !== "admin") {
                  localStorage.setItem("shopin-token", data.Token);
                  localStorage.setItem("userId", data.userId);
                  localStorage.setItem("shopinn-user-profile-image", data.avtar);
                  handleIsLoggedIn();
                  const userId = localStorage.getItem("userId")
                  const response = await apiService.get(`/products/cart/get_cartdata/${userId}`,
                                                        ).catch((err)=>{
                                                          console.log(err)
                                                       
                                                        });
                   
                 
                    if(response){
                      const productData = response.data.products
                      const newArray = productData.map(({ _id, name}) => ({
                        productId: _id,
                        count: 1,
                        productName:name,}));
                        console.log(newArray)
                        dispatch(addCartdataTocartItemsAndCount(newArray));
                    }
                
            
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
            
                  setPartLoader(false);
                  // Reload the page because without a reload, the token in the config file may not work
                  window.location.href = `/`;
                  navigate("/");
                } else if (data.Token && data.Role === "admin") {
                  console.log(data.Token, data.Role);
                  localStorage.setItem("shopin-token", data.Token);
                  localStorage.setItem("userId", data.userId);
                  localStorage.setItem("shopinn-user-profile-image", data.avtar);
            
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
            
                  handleIsLoggedIn();
                  // Reload the page because without a reload, the token in the config file may not work
                  window.location.href = `/admin`;
                  navigate("/admin");
                }
              } catch (error) {
                console.log(error);
                Store.addNotification({
                  title: "Login Failed",
                  message: "Wrong Credential",
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
                setPartLoader(false)
          
              }
            
              setEmailLogin("");
              setPasswordLogin("");
            };
            


            const handleGuestLogin  = async ()=>{
                
                setEmailLogin("ironman@gmail.com")
                setPasswordLogin("ironman12345")
                    const user = {
                      email:"ironman@gmail.com" ,
                      password: "ironman12345"
                    };
           
                  setPartLoader(true)
                  
                    try {
                      localStorage.setItem("email", emailLogin);
                    
                      const response = await fetch(`${AUTH_BASE_URL}/api/user/login`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(user)
                      });
                    
                      if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                      }
                    
                      const data = await response.json();
                    
                      if (data.Token) {
                        localStorage.setItem("shopin-token", data.Token);
                        localStorage.setItem("userId", data.userId);
                        localStorage.setItem("shopinn-user-profile-image", data.avtar);
                    
                        handleIsLoggedIn();
                          const userId = localStorage.getItem("userId")
                          const response = await apiService.get(`/products/cart/get_cartdata/${userId}`,
                                                                ).catch((err)=>{
                                                                  console.log(err)
                                                               
                                                                });

                                                                console.log('hello this')
                           
                         
                            if(response){
                              const productData = response.data.products
                              console.log(productData)
                              const newArray = productData.map(({ _id, name}) => ({
                                productId: _id,
                                count: 1,
                                productName:name,}));
                                dispatch(addCartdataTocartItemsAndCount(newArray));
                                alert(productData)
                                alert(newArray)
                                
                            }
                        
                        
                        setPartLoader(false);
                    
                        const notificationOptions = {
                          title: "Login",
                          message: "User Logged In Successfully",
                          type: "success",
                          insert: "top",
                          container: "top-right",
                          animationIn: ["animate__animated", "animate__fadeIn"],
                          animationOut: ["animate__animated", "animate__fadeOut"],
                          dismiss: {
                            duration: 2000,
                            onScreen: true
                          }
                        };
                    
                        // Show notification
                        Store.addNotification(notificationOptions);
                    
                        // Reload the page
                        window.location.href = `/`;
                        navigate("/");
                      }
                    
                      if (data.Role === "admin") {
                        localStorage.setItem("shopin-token", data.Token);
                        localStorage.setItem("userId", data.userId);
                        localStorage.setItem("shopinn-user-profile-image", data.avtar);
                    
                        // Alert is not recommended, consider using a notification library
                        alert("User logged in successfully");
                    
                        handleIsLoggedIn();
                      await  dispatch(addCartdataTocartItemsAndCount());
                    
                        // Redirect to admin page
                        navigate("/admin");
                      }
                    } catch (error) {
                      console.error(error, "Error at authcontext");
                    }
                    
                  
            }
            
            

            const handleSingupFormSubmit = async(e)=>{
                e.preventDefault();
                setPartLoader(true)
            
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
            
                      setPartLoader(false)
                     if (!response.ok) {
                      throw new Error('Network response was not ok.');
                    }
                      
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
            setEmailSignup, setPasswordSignup, setUsername, isLoading,
             handleLoginFormSubmit, handleGuestLogin, handleSingupFormSubmit, handleUserLogout }} >
                
                        {children}

                    </AuthContext.Provider>


        }




