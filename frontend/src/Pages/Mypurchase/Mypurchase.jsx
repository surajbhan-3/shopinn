import React from 'react'
import { useState, useEffect } from 'react'
import apiService from '../../Config/apiService'
function Mypurchase() {

  
    useEffect(()=>{

        const getPurchaseData = async()=>{

             try {
                const response = await apiService.get('/products/purchase_items',)
               console.log(response, "hey resopnse dslkd")
             } catch (error) {
                
             }
        }
        getPurchaseData()

    },[])

 

  return (
    <div>Mypurchase</div>
  )
}

export default Mypurchase