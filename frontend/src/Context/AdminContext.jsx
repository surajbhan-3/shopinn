
import {useState,useEffect, createContext} from "react";
import { Store } from 'react-notifications-component';
import axios from "axios";
import apiService from "../Config/apiService";
export const AdminContext = createContext();


export const AdminContextProvider = ({children}) =>{

    const [productName, setProductName] = useState("")
    const [brandName, setBrandName] = useState("")
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("")
    const [gender, setGender] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription]= useState("")  
    const [partLoader, setPartLoader]= useState(false)
    const [data, setData] = useState([])
    const [dashboardCountData, setDashbaordCountData]=useState({})
    const isLoading = partLoader
   

       

    const dashboardCount = async (e)=>{

      setPartLoader(true)
    
      try {
        const response = await apiService.get(`/admin/dashboard/counts`)
        setPartLoader(false)
        setDashbaordCountData(response.data)
      
    } catch (error) {
    console.log(error)
    }
    
    
             
     }








    const handleImagechange = async (event) =>{
        event.preventDefault()
        setSelectedFile(event.target.files[0])
    }

   const handleUdateProductImage  = async(event)=>{
         event.preventDefault()
         const formData = new FormData();
         formData.append('avtar', selectedFile)

         try {
          const formData = new FormData();
          formData.append('avtar', selectedFile);
          formData.append('productId', localStorage.getItem("productId"))
        
      
          const response = await apiService.patch(`/admin/update/product_image`,formData);
            if(response.data.status === "success"){
                  setPartLoader(false)
              Store.addNotification({
                title: "Image Updated",
                message: "Image has been updated",
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
              window.location.reload()
      
            }
      
          // Handle the uploaded URL (e.g., display the image)
        } catch (error) {
          console.error('Upload failed:', error);
          setPartLoader(false)
        }
         
   }

    
    const handleAddProduct = async(event)=>{

        event.preventDefault()
        setPartLoader(true)
   try {
     const formData = new FormData();
     formData.append('avtar', selectedFile);
     formData.append('productName', productName)
     formData.append('productBrand', brandName)
     formData.append("description", description)
     formData.append('price', price)
     formData.append('category', category)
     formData.append('subcategory', subcategory)
     formData.append('gender', gender)
 
     const response = await apiService.post(`/admin/add_product`,formData,   );
       if(response.data.status === "success"){
             setPartLoader(false)
         Store.addNotification({
           title: "Product Added",
           message: "Produc has been addedd",
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
         window.location.reload()
 
       }
 
           console.log(response)
     // Handle the uploaded URL (e.g., display the image)
   } catch (error) {
     console.error('Upload failed:', error);
     setPartLoader(false)
   }
 
 };

 const handleUpdateProduct = async (e)=>{
  const productId = localStorage.getItem("productId")
  e.preventDefault()
  setPartLoader(true)

  try {
    const response = await apiService.patch(`/admin/update_product`,
    {
        brandName,
        productName,
        price,
        description,
        category,
        subcategory,
        gender,
        productId
    },
    
    {
   
     headers:{
        Authorization:`Bearer ${localStorage.getItem("shopin-token")}`
     }
      
    })
    setPartLoader(false)
   
} catch (error) {
console.log(error)
}


         
 }


// data showing in upadate page
 useEffect(()=>{
  const productId = localStorage.getItem("productId")
const  getSingleProduct = async()=>{
         
          try {
                 const response = await apiService.get(`/admin/product_details/${productId}`)
                 setData(response.data)
                 setProductName(response.data.name)
                 setBrandName(response.data.brand)
                 setPrice(response.data.price)
                 setCategory(response.data.category)
                 setSubcategory(response.data.subcategory)
                 setDescription(response.data.description)
                 setGender(response.data.gender)
          } catch (error) {
            console.log(error)
          }
  }
  getSingleProduct();

},[])

 



 const handleDeleteProduct = async () => {
  const productId = localStorage.getItem("productId")

try {
     await apiService.delete(`/admin/product_details/${productId}`,
                     {
                     
                    data: productId
                    
                   })
                     
                    } catch (error) {
                    console.log(error)

                   }
  
}
 


    

      
      return  <AdminContext.Provider value={{

        handleImagechange, handleAddProduct,productName, setProductName, brandName, setBrandName, category,setCategory,
       description,  setDescription, gender, setGender, price, setPrice, handleUpdateProduct,
       subcategory, setSubcategory, isLoading,
       handleDeleteProduct, data, setData , handleUdateProductImage, dashboardCount, dashboardCountData,
      }} >
               
                       {children}
      
        </AdminContext.Provider>
      
      
}
