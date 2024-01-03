import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../Context/AuthContext';


function Privateroute() {
    const {isLoggedIn} = useContext(AuthContext)
  return (
    isLoggedIn ? <Outlet /> : <Navigate to="/login" /> 
  )
}


export default Privateroute