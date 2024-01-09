import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
function Mypurchase() {

  
    useEffect(()=>{

        const getPurchaseData = async()=>{

             try {
                const response = await axios.get('http://localhost:4500/api/products/purchase_items',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("shopin-token")}`,
                      }
                })
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