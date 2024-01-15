# shopInn a fullstack e-commerce application

### Stack

  HTML5 | CSS3 | Javascript | React.js | Redux | Redux-thunk |
  Redux-Persist | Axios | JsonWebToken | Node.js | Mongodb 
  Mongoose | express.js | Multer | Cloudinary 
  Bcrypt | Cors | Dotenv 

# File Structure:

        ShopInn
        |
        |----- backend/
        |         |----- config/
        |         |         |----- db.js
        |         |----- controllers/
        |         |         |----- productController.js
        |         |         |----- userController.js
        |         |         |----- adminController.js 
        |         |         |----- paymentController.js 
        |         |----- middleware/
        |         |         |----- authorization.js
        |         |         |----- multer.middleware.js
        |         |----- models/
        |         |         |----- addressmodel.js
        |         |         |----- blacklistmodel.js
        |         |         |----- cartmodel.js
        |         |         |----- ordermodel.js
        |         |         |----- paymentmodel.js
        |         |         |----- productmodel.js
        |         |         |----- reviewmodel.js
        |         |         |----- usermodel.js
        |         |         |----- userUpdatemodel.js
        |         |         |----- wishlistmodel.js
        |         |----- public/
        |         |----- temp/
        |         |----- routes/
        |         |         |----- productRoutes.js
        |         |         |----- userRoutes.js   
        |         |         |----- adminRoutes.js   
        |         |         |----- paymentRoutes.js   
        |         |----- utils/
        |         |         |----- cloudinary.js
        |         |         |----- admiCloudinary.js
        |         |
        |         |----- index.js
        |         |----- pakage-lock.json
        |         |----- package.json
        |  
        |----- frontend/
        |         |----- public/
        |         |         |----- index.html
        |         |----- src/
        |         |         |----- Admin/
        |         |         |         |----- Component/
        |         |         |         |         |----- Adminnavbar/
        |         |         |         |         |         |----- Adminnavbar.css/
        |         |         |         |         |         |----- Adminnavbar.jsx/
        |         |         |         |         |
        |         |         |         |         |----- Books/
        |         |         |         |         |         |----- Books.css
        |         |         |         |         |         |----- Books.jsx 
        |         |         |         |         |----- Electronics/
        |         |         |         |         |         |----- Electronics.css
        |         |         |         |         |         |----- Electronic.jsx  
        |         |         |         |         |----- Shoes/
        |         |         |         |         |         |----- Shoes.css
        |         |         |         |         |         |----- Shoes.jsx    
        |         |         |         |         |----- UserCard/
        |         |         |         |         |         |----- UserCard.css
        |         |         |         |         |         |----- UserCard.jsx                                     
        |         |         |         |----- Pages/
        |         |         |         |         |
        |         |         |         |         |-----  Addproducts/
        |         |         |         |         |          |----- Addproducts.css
        |         |         |         |         |          |----- Addproduct.jsx  
        |         |         |         |         |-----  Dashboard/
        |         |         |         |         |          |----- Dashboard.css
        |         |         |         |         |          |----- Dashboard.jsx  
        |         |         |         |         |-----  Productupdate/
        |         |         |         |         |          |----- Productupdate.css
        |         |         |         |         |          |----- Productupdate.jsx  
        |         |         |         |
        |         |         |----- assets/
        |         |         |----- Component/
        |         |         |         |----- BookCard/
        |         |         |         |         |----- BookCard.css
        |         |         |         |         |----- BookCard.jsx
        |         |         |         |----- CartProduct/
        |         |         |         |         |----- CartProduct.css
        |         |         |         |         |----- CartProduct.jsx
        |         |         |         |----- Category/
        |         |         |         |         |----- Category.css
        |         |         |         |         |----- Category.jsx
        |         |         |         |----- Footer/
        |         |         |         |         |----- Footer.css
        |         |         |         |         |----- Footer.jsx
        |         |         |         |----- Hero/
        |         |         |         |         |----- Hero.css
        |         |         |         |         |----- Hero.jsx     
        |         |         |         |----- Loader/
        |         |         |         |         |----- Loader.css
        |         |         |         |         |----- Loader.jsx      
        |         |         |         |----- MobileCard/
        |         |         |         |         |----- MobileCard.css
        |         |         |         |         |----- MobileCard.jsx
        |         |         |         |----- Myorder/
        |         |         |         |         |----- Myorder.css
        |         |         |         |         |----- Myorder.jsx
        |         |         |         |----- Navbar/
        |         |         |         |         |----- Navbar.css
        |         |         |         |         |----- Navbar.jsx
        |         |         |         |----- Offer/
        |         |         |         |         |----- Offer.css
        |         |         |         |         |----- Offer.jsx        
        |         |         |         |----- PartLoader/
        |         |         |         |         |----- PartLoader.css
        |         |         |         |         |----- PartLoader.jsx
        |         |         |         |----- Private/
        |         |         |         |         |----- Private.jsx
        |         |         |         |----- Profile/
        |         |         |         |         |----- Profile.css
        |         |         |         |         |----- Profile.jsx
        |         |         |         |----- ShoeCard/
        |         |         |         |         |----- ShoeCard.css
        |         |         |         |         |----- ShoeCard.jsx
        |         |         |         |----- Today/
        |         |         |         |         |----- Today.css
        |         |         |         |         |----- Today.jsx                                                
        |         |         |         |                        
        |         |         |----- Config/
        |         |         |         |----- apiConfig.js
        |         |         |         |----- apiService.js
        |         |         |----- Context/
        |         |         |         |----- AdminContext.js
        |         |         |         |----- AuthContext.js
        |         |         |         |----- ProductContext.js
        |         |         |         |----- UserContext.js                        
        |         |         |----- Pages/
        |         |         |         |----- About/     
        |         |         |         |         |----- About.jsx
        |         |         |         |----- Books/
        |         |         |         |         |----- Books.css  
        |         |         |         |         |----- Books.jsx                
        |         |         |         |----- Cart/
        |         |         |         |         |----- Cart.css  
        |         |         |         |         |----- Cart.jsx                
        |         |         |         |----- Home/
        |         |         |         |         |----- Home.css  
        |         |         |         |         |----- Home.jsx                
        |         |         |         |----- Login/
        |         |         |         |         |----- Login.css  
        |         |         |         |         |----- Login.jsx           
        |         |         |         |----- Mobile/
        |         |         |         |         |----- Mobile.css  
        |         |         |         |         |----- Mobile.jsx           
        |         |         |         |----- Mypurchase/
        |         |         |         |         |----- Mypurchase.css  
        |         |         |         |         |----- Mypurchase.jsx           
        |         |         |         |----- Product/
        |         |         |         |         |----- Product.css  
        |         |         |         |         |----- Product.jsx           
        |         |         |         |----- Reviews/
        |         |         |         |         |----- Reviews.css  
        |         |         |         |         |----- Reviews.jsx           
        |         |         |         |----- Shoes/
        |         |         |         |         |----- Shoes.css  
        |         |         |         |         |----- Shoes.jsx           
        |         |         |         |----- Signup/
        |         |         |         |         |----- Signup.css  
        |         |         |         |         |----- Signup.jsx           
        |         |         |         |----- Wishlist/ 
        |         |         |         |         |----- Wishlist.css  
        |         |         |         |         |----- Wishlist.jsx                                
        |         |         |----- Redux/
        |         |         |         |----- LoaderReducer/
        |         |         |         |         |----- Action.js  
        |         |         |         |         |----- ActionTypes.js      
        |         |         |         |         |----- reducer.js                   
        |         |         |         |----- ProductReducer/ 
        |         |         |         |         |----- Action.js  
        |         |         |         |         |----- ActionTypes.js      
        |         |         |         |         |----- reducer.js   
        |         |         |----- App.css
        |         |         |----- App.jsx
        |         |         |----- index.js
        |         |         |----- package-lock.json
        |         |         |----- package.json
        |
        |


##### Environment Variables
        |
        |----- .env  
        |       MongoURI = "YOUR_MONGODB_URI" 
        |       secret   =  "Your Secret"
        |       PORT     =  4500
        |       salt_rounds = Number range
        |       CLOUDINARY_CLOUD_NAME = "YOUR_CLOUDINARY_CLOUD_NAME" 
        |       CLOUDINARY_API_KEY    = "YOUR_CLOUDINARY_API_KEY" 
        |       CLOUDINARY_API_SECRET = "YOUR_CLOUDINARY_API_SECRET" 
                




### User Routes 
       |
       |----- http://localhost:4500/  || Your Server URL
       |
       |
       |----- http://localhost:4500/api/user/register
       |
       |----- http://localhost:4500/api/user/login
       |
       |----- http://localhost:4500/api/user/logout
       |
       |----- http://localhost:4500/api/user/settings
       |
       |----- http://localhost:4500/api/user/profile_picture/:id
       |
       |----- http://localhost:4500/api/user/products/review/:id
       |
       |
       |
       |
       |




### Products Routes 
       |
       |----- http://localhost:4500/  || Your Server URL
       |
       |
       |----- http://localhost:4500/api/products/products
       |
       |----- http://localhost:4500/api/products/product_details/:id
       |
       |----- http://localhost:4500/api/products/wishlist/add_product
       |
       |----- http://localhost:4500/api/products/wishlist/get_products/:id;
       |
       |----- http://localhost:4500/api/products/wishlist/remove_product/:id
       |
       |----- http://localhost:4500/api/products/cart/add_to_cart
       |
       |----- http://localhost:4500/api/products/cart/get_cartdata/:id
       |
       |----  http://localhost:4500/api/products/cart/remove_cart_items/:id
       |
       |----  http://localhost:4500/api/products/reviews/get_all_reviews
       |




### Admin Routes 
       |
       |----- http://localhost:4500/  || Your Server URL
       |
       |
       |----- http://localhost:4500/api/products/add_product
       |
       |----- http://localhost:4500/api/products/update_product
       |
       |----- http://localhost:4500/api/products/delete_product
       |
     
    