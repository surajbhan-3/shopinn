const { ProductModel } = require("../models/productmodel");
const { UserModel } = require("../models/usermodel");
const {CartModel} = require(".././models/cartmodel")
const {OrderModel} = require(".././models/ordermodel")
const { uploadImageToCloudinary } = require("../utils/adminCloudinary");

// *** admin route

const getAllusers = async (req, res) => {
  try {
    const alluser = await UserModel.find();

    return res.status(200).send(alluser);
  } catch (error) {
    return res.status(500).send({ Message: "Internal Server Error" });
  }
};

const addProduct = async (req, res) => {
  const {
    productName,
    productBrand,
    price,
    category,
    subcategory,
    description,
    gender,
  } = req.body;

  try {
    const avtarFilePath = req.file.path;
    const avtar = await uploadImageToCloudinary(avtarFilePath);
    if (!avtar) {
      return res.status(500).send({ message: "There is Issue in Image uploading" });
    }

    const newProduct = new ProductModel({
      name: productName,
      brand: productBrand,
      imageUrl: avtar.url,
      price: price,
      description: description,
      category: category,
      subcategory: subcategory,
      gender: gender,
    });
   
    await newProduct.save();
    return res.status(201).json({ status: "success", message: "Data has benn added Successfully" });
  } catch (error) {
    return res.status(500).json({status: "error",message: "Internal Server Error",Error: error.message});
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.body;

  try {
         await ProductModel.findByIdAndDelete({_id: productId});
         res.status(200).json({ status: "success", message: "Product has benn deleted Successfully" });
      } catch (error) {
         res.status(500).json({status: "error",message: "Internal Server Error",Error: error.message});
      }
};

const updateProduct = async (req, res) => {
  const {
    productName,
    brandName,
    price,
    category,
    subcategory,
    description,
    gender,
    productId,
  } = req.body;
  try {
    const product = await ProductModel.findOne({ _id: productId });

    if (!product) {
      return res.status(404).json({status: "error",message: "Product not found"});
    }

    (product.name = productName),
      (product.brand = brandName),
      (product.subcategory = subcategory),
      (product.price = price),
      (product.category = category),
      (product.description = description),
      (product.gender = gender),
      await product.save();
    return res.status(201).json({status: "success", message: "Product has been updated successfully"});
  } catch (error) {
    return res.status(500).json({status: "error", message: "Internal Server Error",Error: error.message});
  }
};

const updateProductImage = async (req, res) => {
  const { productId } = req.body;
  try {
    const product = await ProductModel.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const avtarFilePath = req.file.path;
    const avtar = await uploadImageToCloudinary(avtarFilePath);
    if (!avtar) {
      return res.status(500).send({status: "error",message: "Image upload causing error"});
    }
    product.imageUrl = avtar.url;

    await product.save();
    return res.status(201).send({status: "success",message: "Image updated successfully"});
  } catch (error) {
    return res.status(500).send({status: "error",message: "Internal Server Error",Error: error.message});
  }
};



const singleProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await ProductModel.findOne({ _id: productId });
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).json({status: "error",message: "Internal Server Error",Error: error.message});
  }
};

const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const categoryProducts = await ProductModel.find({ category: category });
    return res.status(200).send(categoryProducts);
  } catch (error) {
    return res.status(500).json({status: "error",message: "Internal Server Error",Error: error.message});
  }
};

const getDashboardCounts = async (req,res)=>{
         console.log("hello")
             try {
               const totalUser = await UserModel.find()
               const totalUserCount= totalUser.length
               const totalProducts = await ProductModel.find()
               const totalProductsCount= totalProducts.length
               const totalCartItems = await CartModel.find()
               const totalItemsInCart = totalCartItems.length
               const totalOrderItems = await OrderModel.find()
              const  totalItemsInOrder = totalOrderItems.length

               return res.status(200).json({totalUserCount, totalProductsCount, totalItemsInCart, totalItemsInOrder}) 

             } catch (error) {
              return res.status(500).json({status: "error",message: "Internal Server Error",Error: error.message});

             }
}
module.exports = {
  getAllusers,
  deleteProduct,
  updateProduct,
  addProduct,
  getProductsByCategory,
  singleProduct,
  updateProductImage,
  getDashboardCounts,
};
