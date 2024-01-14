import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

import "./Dashboard.css"
import Usercard from '../../Components/Usercard/Usercard'
import Electronics from '../../Components/Electronics/Electronics'
import Shoes from '../../Components/Shoes/Shoes'

function Dashboard() {
 const [data, setData] = useState([])
 const [electronicsData , setElectronicsData] = useState([])
 const [shoesData, setShoesData] = useState([])
 const [booksData, setBooksData] = useState([])
  useEffect(()=>{

     const getUserInfo = async()=>{

         try {
          const response = await axios.get(
            `http://localhost:4500/api/admin/alluser`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("shopin-token")}`,
              },
      
              
            })
         
            setData(response.data)
           
          
         } catch (error) {
           console.log(error)
         }
     }
     getUserInfo()


     const getElectronicsProducts = async()=>{

      try {
       const response = await axios.get(
         `http://localhost:4500/api/admin/products/electronics`,
         {
           headers: {
             Authorization: `Bearer ${localStorage.getItem("shopin-token")}`,
           },
   
           
         })
         setElectronicsData(response.data)
    
       
      } catch (error) {
        console.log(error)
      }
  }
  getElectronicsProducts()


  const getShoesProducts = async()=>{

    try {
     const response = await axios.get(
       `http://localhost:4500/api/admin/products/shoes`,
       {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("shopin-token")}`,
         },
 
         
       })
     
       setShoesData(response.data)
  
    } catch (error) {
      console.log(error)
    }
}
getShoesProducts()
const getBooksProducts = async()=>{

  try {
   const response = await axios.get(
     `http://localhost:4500/api/admin/products/books`,
     {
       headers: {
         Authorization: `Bearer ${localStorage.getItem("shopin-token")}`,
       },

       
     })
    
     setBooksData(response.data)
    
   
  } catch (error) {
    console.log(error)
  }
}
getBooksProducts()


  },[])



  return (
    <div className='dashboard-page'>
         <div className="dash-right">
             <div className="top-info-div">
                <div>Totla Number of user</div>
                <div>Total Number of producst</div>
                <div>Cart Data</div>
                <div>Order Data</div>
                <div>Total Reviews</div>
             </div>
             <div className="main-detail-wrapper">
                 <div className='alluserDetails'>
                  <h4>All user</h4>
                      {data ? (
                     data.map((el) => (
                      <Usercard key={el._id} userId={el._id} name={el.username} avtar={el.avtar} />
                      // key is not a prop 
                    ))
                  ) : (
                     <div>No user Exist</div>
                    )}
               
                 </div>
                 <div className='allproducts-wrapper-aa'>
                    <h4>All Products</h4>
                    <div className='allproducts-a'>
                     <div>
              
                        <div>
                        <h4>Electronics</h4>
                      {electronicsData ? (
                     electronicsData.map((el) => (
                      <Electronics key={el._id} productId={el._id} name={el.name} avtar={el.imageUrl} />
                    ))
                  ) : (
                     <div>No user Exist</div>
                    )}
               
                 </div>
                       
                     </div>
                     <div>
                       <div>
                        <h4>Shoes</h4>
                      {shoesData ? (
                     shoesData.map((el) => (
                      <Shoes key={el._id} productId={el._id} name={el.name} avtar={el.imageUrl} />
                    ))
                  ) : (
                     <div>No user Exist</div>
                    )}
               

                       </div>
                      </div> 
                    <div>
                    <div>
                        <h4>Books</h4>
                      {booksData ? (
                     booksData.map((el) => (
                      <Shoes key={el._id} productId={el._id} name={el.name} avtar={el.imageUrl} />
                    ))
                  ) : (
                     <div>No user Exist</div>
                    )}
               

                       </div>

                    </div>

                     </div>
                 </div>
                

           </div>

     
         </div>
    </div>
  )
}

export default Dashboard