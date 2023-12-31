import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from "axios";
import "./Product.css"
function Product() {

  let productId =localStorage.getItem("shopinn-product-key")

    const [data, setData] = useState([])
    const ___cartProducts = (useSelector((state)=>{
      return state.ProductReducer.cartData
}))


console.log(___cartProducts, "cartpreoda")

const __wishlistProducts = useSelector((state) => {
  return state.ProductReducer.wishlistData;
});

let isProductPresentInCart = false;
let isProductPresentInWishlist = false;

let checkProductInCart = ___cartProducts.find((el)=>{
        return el._id === productId
})
if(checkProductInCart){
  isProductPresentInCart=true
}

if(checkProductInCart){
  console.log("true")
}

let checkProductInWishlist = __wishlistProducts.find((el)=>{
   return el._id === productId
})
if(checkProductInWishlist){
   isProductPresentInWishlist = true;
}


    const __productKey = localStorage.getItem("shopinn-product-key")
    



      useEffect(()=>{
        const getSingleProduct = async()=>{
           
          
          
              const response = await axios.get(
                  `http://localhost:4500/api/products/product_details/${__productKey}`,
                
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("shopin-token")}`,
                    },
                  }
                ).catch((err)=>{
                  console.log(err)
                });
                console.log(response.data)
                setData(response.data)
              };
          
              getSingleProduct()             

    },[])
    

  return (
    <div className='product_page'>
     
     <div className='productWrapper'>
        {data.map((product) => {
            return (
                <div className='in-card' key={product._id}> 
                     <div className="left-div">
                           <img src={product.imageUrl} alt="" />
                     </div>
                     <div className="right-div">
                        <h1>{product.name}</h1>
                         <p>by: {product.brand}</p>
                        <div>
                            <p>{product.description}</p>
                        </div>
                         <div>
                            <p>Price : Rs.{product.price}</p>
                         </div>

                         <div>
                          {isProductPresentInCart? <button>Go to Cart</button> :<button>Add to cart</button>  }
                           
                      </div>

                      <div>
                      {isProductPresentInWishlist? <button>Go to Wishlist</button> :<button>Add to Wishlist</button>  }
                      </div>

                     </div>

                      
                </div>
            )
        })}
    </div>
 </div>
  )
}

export default Product