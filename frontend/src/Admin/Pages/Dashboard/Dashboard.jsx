import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useContext  } from 'react'
import "./Dashboard.css"
import Usercard from '../../Components/Usercard/Usercard'
import Electronics from '../../Components/Electronics/Electronics'
import Shoes from '../../Components/Shoes/Shoes'
import { AdminContext } from '../../../Context/AdminContext'
import apiService from '../../../Config/apiService'

function Dashboard() {
 const [data, setData] = useState([])
 const [electronicsData , setElectronicsData] = useState([])
 const [shoesData, setShoesData] = useState([])
 const [booksData, setBooksData] = useState([])
 const {dashboardCount, dashboardCountData} = useContext(AdminContext)

 useEffect(()=>{

      dashboardCount()
 },[])
  useEffect(()=>{
   
     const getUserInfo = async()=>{

         try {
          const response = await apiService.get(`/admin/alluser`)
         
            setData(response.data)
           
          
         } catch (error) {
           console.log(error)
         }
     }
     getUserInfo()


     const getElectronicsProducts = async()=>{

      try {
       const response = await apiService.get(`/admin/products/electronics`)
         setElectronicsData(response.data)
    
       
      } catch (error) {
        console.log(error)
      }
  }
  getElectronicsProducts()


  const getShoesProducts = async()=>{

    try {
     const response = await apiService.get( `/admin/products/shoes`)
     
       setShoesData(response.data)
  
    } catch (error) {
      console.log(error)
    }
}
getShoesProducts()
const getBooksProducts = async()=>{

  try {
   const response = await apiService.get(`/admin/products/books`,)
    
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
                <div>
                  <div>Number of user</div>
                <div>{dashboardCountData.totalUserCount}</div>
                </div>

                <div>
                  <div>Number of product</div>
                  <div>{dashboardCountData.totalProductsCount}</div>
                </div>
                <div>
                  <div>Cart Items</div>
                  <div>{dashboardCountData.totalItemsInCart}</div>
                </div>
                <div>
                  <div>Ordered Items</div>
                  <div>{dashboardCountData.totalItemsInOrder}</div>
                </div>
                <div>
                  <div>Reviews</div>
                  <div>4</div>
                </div>
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
                     <div className='p-heading'> <h4>All Products</h4></div>
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