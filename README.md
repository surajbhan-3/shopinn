# shopInn a fullstack e-commerce application

### Stack

  Html Css Javascript React.js Redux Redux-thunk Axios
  Node.js Mongodb Mongoose express.js Multer Cloudinary 
  Jwt Bcrypt Cors Dotenv

# File Structure:

        ShopInn
        |
        |----- backend/
        |         |----- config/
        |         |         |----- db.js
        |         |----- controllers/
        |         |         |----- productController.js
        |         |         |----- userController.js
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
        |         |----- utils/
        |         |         |----- cloudinary.js
        |         |
        |         |----- index.js
        |         |----- pakage-lock.json
        |         |----- package.json
        |  
        |----- frontend/
        |         |----- public/
        |         |----- src/
        |         |----- assets/
        |         |----- Component/
        |         |----- Context/
        |         |----- Pages/
        |         |----- Redux/
        |         |----- App.css
        |         |----- App.jsx
        |         |----- index.js
        |         |----- package-lock.json
        |         |----- package.json
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
     
    