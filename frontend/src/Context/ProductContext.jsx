
/* 
   # Functions available 
    
    1.  handleAddProductToWishlist 
    2.  handleSingleProductPage


*/ 


import { createContext, useContext, useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router'
import { AuthContext } from "./AuthContext";
import { Store } from 'react-notifications-component';
import apiService from "../Config/apiService";
import { wishlistProducts,cartProducts } from "../Redux/ProductReducer/Action";
import { incrementQuantity, deleteItemFromCartDataAndcount } from "../Redux/ProductReducer/Action";


export const ProductContext = createContext();


export const ProductContextProvider = ({children})=>{
const {isLoggedIn} = useContext(AuthContext)
const [partLoader, setPartLoader]= useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoading = partLoader
    

    
           
    const handleAddProductToWishlist = async (productId) => {
        if (!isLoggedIn) {
          navigate("/signup");
        } else {
        try {
                 setPartLoader(true)
              
    
            const response = await apiService.post(`/products/wishlist/add_product`,
              {
                userId: localStorage.getItem("userId"),
                productId: productId,
              },
            ).catch((err)=>{
        
              Store.addNotification({
                title: "Product Already In  Wishlist",
                message: "Produc has been  in wishlist",
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
          
              
            });
        
            if(response){
              setPartLoader(false)
         
              Store.addNotification({
                title: "Product Added To Wishlist",
                message: "Product has been added to Wishlist",
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
              dispatch(wishlistProducts())
        
             }
             
          
          
        } catch (error) {
           console.log(error)
        }
         
        }
      };

    const handleSingleProductPage = (key) =>{
        localStorage.setItem("shopinn-product-key", key)
         navigate("/product")     
    }
    
    const removeProductFromWishlist = async (productId) => {
      try {
        const response = await apiService.delete(
          `/products/wishlist/remove_product/${productId}`,
          {
            // this data keyword is neccessary in axios when using delete method 
            data: {
              userId: localStorage.getItem("userId")
            }
          }
        );
        if(response){
          Store.addNotification({
            title: "Product Removed",
            message: "Product has been Remove from cart",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 2000,
              onScreen: true
            }
          })};
    
       
        dispatch(wishlistProducts());
        
      } catch (err) {
        console.log(err);
      }
    };
    
 
        


    const handleAddProductToCart = async (productId,name) => {
      const response = await apiService.post(
        `/products/cart/add_to_cart`,
        {
          userId: localStorage.getItem("userId"),
          productId: productId,
        }
       
      ).catch((err)=>{

     
      Store.addNotification({
        title: "Product Already In  Cart",
        message: "Produc has been  in cart",
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
  
        console.log(err)

      });
      dispatch(incrementQuantity(productId, 1, name))
  
       if(response){
      Store.addNotification({
        title: "Product Added To Cart",
        message: "Product has been added to cart",
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
         
      dispatch(cartProducts())
  
       
       }
    }; 




const moveProducToWishlist = async (productId) => {
  
  const response = await apiService.post(
    `/products/wishlist/add_product`,
    {
      userId: localStorage.getItem("userId"),
      productId: productId,
    }
    
    
  ).catch((err)=>{

    Store.addNotification({
      title: "Product Already In  Wishlist",
      message: "Produc has been  in wishlist",
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
    
  });
  dispatch(deleteItemFromCartDataAndcount(productId))
  dispatch(wishlistProducts())

  if(response){
    Store.addNotification({
      title: "Product Added To Wishlist",
      message: "Product has been added to Wishlist",
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

   }
   
};




 
const removeProductFromCart = async (productId) => {
  try {
    
    const response = await apiService.delete(
      `/products/cart/remove_cart_items/${productId}`,
      {
        // this data keyword is neccessary in axios when using delete method 
        data: {
          userId: localStorage.getItem("userId")
        }
      }
    );
    
   
    dispatch(deleteItemFromCartDataAndcount(productId))
    dispatch(cartProducts());
  } catch (err) {
    console.log(err);
  }
};

     

return  <ProductContext.Provider value={{handleAddProductToWishlist, handleSingleProductPage,

           removeProductFromWishlist, handleAddProductToCart,moveProducToWishlist, removeProductFromCart, isLoading
}} >
                
                        {children}

         </ProductContext.Provider>


        }




