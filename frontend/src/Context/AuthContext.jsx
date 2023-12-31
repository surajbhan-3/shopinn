
import {useState, createContext} from "react";

export const AuthContext = createContext();


export const AuthContextProvider = ({children})=>{
     
    const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
    const handleIsLoggedIn = ()=>{
        setLoggedIn(true)
        localStorage.setItem('isLoggedIn', 'true');
        }

const handleIsLoggedOut = () =>{
       setLoggedIn(false);
       localStorage.removeItem('isLoggedIn');
    }

   return <AuthContext.Provider value={{isLoggedIn:isLoggedIn,handleIsLoggedIn:handleIsLoggedIn,handleIsLoggedOut:handleIsLoggedOut}} >
            {children}
   </AuthContext.Provider>
}




