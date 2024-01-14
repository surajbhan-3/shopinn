const { ProductModel } = require("../models/productmodel");
const { WishlistModel } = require("../models/wishlistmodel");
const { CartModel } = require("../models/cartmodel");
const { ReviewModel } = require("../models/reviewmodel");
const mongoose = require("mongoose");
const { OrderModel } = require("../models/ordermodel");

const getProduct = async (req, res) => {
  try {
    const allProducts = await ProductModel.aggregate([
      { $sample: { size: 6 } },
    ]);
    return res.status(200).send(allProducts);
  } catch (error) {
   return res.status(500).json({status: "error",message: "Internal Server Error",Error: error.message});

  }
};

const getSingleProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const singleProduct = await ProductModel.find({ _id: productId });

    const ifProductHasReviews = await ReviewModel.findOne({
      product: productId,
    });

    if (!ifProductHasReviews) {
      return res.status(200).send([singleProduct, []]);
    }
    const userReviews = await ReviewModel.findOne({
      product: productId,
    }).populate({
      path: "reviews.user",
    });
    const allReviews = userReviews.reviews;

    const reviewDetails = allReviews.map((el) => {
      return {
        user: {
          username: el.user.username,
          avtar: el.user.avtar,
          userId: el.user._id,
        },
        rating: el.rating,
        reviewTitle: el.reviewTitle,
        reviewData: el.reviewData,
        reviewDate: el.reviewDate,
      };
    });
    return res.status(200).send([singleProduct, reviewDetails]);
  } catch (error) {
   return res.status(500).json({status: "error",message: "Internal Server Error",Error: error.message});
  }
};

const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  const page = req.params.pagenumber;

  const minPrice = parseInt(req.query.min);
  const maxPrice = parseInt(req.query.max);
  const middle = parseInt(req.query.middle);

  const skipedd = (parseInt(page) - 1) * 8;
  try {
    if (middle) {
      const categoryProducts = await ProductModel.find({
        category: category,
        $or: [
          { price: { $gte: 100, $lte: 500 } },
          { price: { $gte: 1000, $lte: 1999 } },
        ],
      })
        .skip(skipedd)
        .sort({ price: 1 })
        .limit(8);
      return res.status(200).send(categoryProducts);
    }
    if (!minPrice || !maxPrice) {
      const categoryProducts = await ProductModel.find({ category: category })
        .skip(skipedd)
        .limit(8);
      return res.status(200).send(categoryProducts);
    }
    if (minPrice && maxPrice) {
      const categoryProducts = await ProductModel.find({
        category: category,
        price: { $gte: minPrice, $lte: maxPrice },
      })
        .sort({ price: 1 })
        .skip(skipedd)
        .limit(8);
      return res.status(200).send(categoryProducts);
    }

    const categoryProducts = await ProductModel.find({ category: category })
      .skip(skipedd)
      .limit(8);
    return res.status(200).send(categoryProducts);
  } catch (error) {
   return res.status(500).json({status: "error",message: "Internal Server Error",Error: error.message});
}
};

const getProductsBySubCategory = async (req, res) => {
  const { category, subcategory } = req.params;
  const page = req.params.pagenumber;
  const minPrice = parseInt(req.query.min);
  const maxPrice = parseInt(req.query.max);
  const middle = parseInt(req.query.middle);


  const skipedd = (parseInt(page) - 1) * 8;
  try {
    // triple eual will not work because  javascript comparies ojbect with refrence so vale always be falsey
    // but {} empty object is a truethy

    if (middle) {
      const categoryProducts = await ProductModel.find({
        category: category,
        subcategory: subcategory,
        $or: [
          { price: { $gte: 100, $lte: 500 } },
          { price: { $gte: 1000, $lte: 1999 } },
        ],
      })
        .skip(skipedd)
        .sort({ price: 1 })
        .limit(8);
      return res.status(200).send(categoryProducts);
    }
    if (!minPrice || !maxPrice) {
      const categoryProducts = await ProductModel.find({
        category: category,
        subcategory: subcategory,
      })
        .skip(skipedd)
        .limit(8);
      return res.status(200).send(categoryProducts);
    }

    const categoryProducts = await ProductModel.find({
      category: category,
      subcategory: subcategory,
      price: { $gte: minPrice, $lte: maxPrice },
    })
      .skip(skipedd)
      .limit(8);
    return res.status(200).send(categoryProducts);
  } catch (error) {
   return res.status(500).json({status: "error",message: "Internal Server Error",Error: error.message});
  }
};

const addProductToWishList = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    if (!userId || !productId) {
      return send({ message: "falult at various level" });
    }
    let wishlist = await WishlistModel.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new WishlistModel({ user: userId, products: [productId] });
     
      await wishlist.save();
      return res.status(200).json({ Message: "Added Successfully" });
    } else {
    
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      
        await wishlist.save();

        return res.status(200).json({ Message: "Added Successfully" });
      } else {
      

        return res
          .status(409)
          .json({ Message: "Product is already in wishlist" });
      }
    }
  } catch (error) {
   return res.status(500).json({status: "error",message: "Internal Server Error",Error: error.message});
  }
};

const getProductFromWishlist = async (req, res) => {
  const userId = req.params.userId;
  try {
    const wishlist = await WishlistModel.findOne({ user: userId }).populate(
      "products"
    );

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    return res.status(200).send(wishlist);
  } catch (error) {
   return res.status(500).json({status: "error",message: "Internal Server Error",Error: error.message});
  }
};

const removeSingleProductFromWishlist = async (req, res) => {
  const productId = req.params.id;
  const { userId } = req.body;

  try {
    const wishlist = await WishlistModel.findOne({ user: userId });

    let products = wishlist.products;
    const item = products.find((el) => {
      return el == productId;
    });

    const itemFilter = products.filter((el) => {
      return el !== item;
    });
    wishlist.products = itemFilter;
    await wishlist.save();

    return  res.status(200).json({ status: "success", message: "Product Removed from wishlist successfully" });

  } catch (error) {
   return res.status(500).json({status: "error",message: "Internal Server Error",Error: error.message});

  }
};

const addProductToCart = async (req, res) => {
  const { userId, productId } = req.body;


  try {
    if (!userId || !productId) {
      return send({ message: "falult at various level" });
    }
    let cartData = await CartModel.findOne({ user: userId });


    if (!cartData) {
      cartData = new CartModel({ user: userId, products: [productId] });
      
      await cartData.save();
     return  res.status(200).json({ status: "success", message: "Product added successfully" });

    } else {
   
      if (!cartData.products.includes(productId)) {
        cartData.products.push(productId);

        await cartData.save();

        return res.status(200).json({ Message: "Added Successfully" });
      } else {

        return res.status(409).json({ Message: "Product is already in cart" });
      }
    }
  } catch (error) {
   return res.status(500).json({status: "error",message: "Internal Server Error",Error: error.message});
  }
};

const getProductFromCart = async (req, res) => {
  const userId = req.params.id;
  try {
    const cartData = await CartModel.findOne({ user: userId }).populate(
      "products"
    );

    if (!cartData) {
      return res.status(404).json({ message: "CartData not found" });
    }


    return res.status(200).send(cartData);
  } catch (error) {
   return res.status(500).json({status: "error",message: "Internal Server Error",Error: error.message});
  }
};

const removeSingleProductFromCart = async (req, res) => {
  const productId = req.params.id;
  const { userId } = req.body;

  try {
    const cartData = await CartModel.findOne({ user: userId });

    let products = cartData.products;
    const item = products.find((el) => {
      return el == productId;
    });

    const itemFilter = products.filter((el) => {
      return el !== item;
    });
    cartData.products = itemFilter;
    await cartData.save();
    res.status(200).json({ status: "success", message: "Product removed successfully from wishlist" });
  } catch (error) {
   return res.status(500).json({status: "error",message: "Internal Server Error",Error: error.message});
  }
};

const getAllReivewsGiven = async (req, res) => {
  const { userId } = req.body;
  const objectId = new mongoose.Types.ObjectId(userId);


  try {
    const allData = await ReviewModel.aggregate([
      {
        $match: { "reviews.user": objectId },
      },
      { $unwind: "$reviews" },
      { $match: { "reviews.user": objectId } },
      {
        $project: {
          review: "$reviews", // Project only the matching review object
          productId: "$product",
          _id: 0,
        },
      },
    ]);

    // Doing this because currently not able to make a query

    const promises = allData.map(async (el) => {
      const productData = await ProductModel.findOne({ _id: el.productId });

      return {
        ...el,
        productData,
      };
    });
    const data = await Promise.all(promises);

    return res.status(200).send(data);
  } catch (error) {}
};

const deleteReview = async (req, res) => {
  const { userId, reviewId } = req.body;
  try {
    const updateReviewData = await ReviewModel.updateOne(
      { "reviews.user": objectId },
      { $pull: { reviews: { _id: reviewId } } }
    );


    res.status(200).json({ status: "success", message: "Review deleted successfully" });

   } catch (error) {
   return res.status(500).json({status: "error",message: "Internal Server Error",Error: error.message});
}
};

const saveOrderDetails = async (req, res) => {
  const { userId, data } = req.body;
  try {
    const findUser = await OrderModel.findOne({ user: userId });
    if (!findUser) {
      const orderData = new OrderModel({ user: userId, products: data });
      await orderData.save();
      res.status(200).json({ status: "success", message: "user data saved" });
    }
  } catch (error) {
   return res.status(500).json({status: "error",message: "Internal Server Error",Error: error.message});
}
};

const getPurchaseItems = async (req, res) => {
  const { userId } = req.body;

  try {
    const findUser = await OrderModel.findOne({ user: userId });


    if (!findUser) {
      return res.status(404).send({ Message: "No data found" });
    }
    const userPurchaseItems = await OrderModel.aggregate([
      { $match: { user: userId } },
      { $unwind: "$products" },
    ]);
    console.log(userPurchaseItems);
    res.status(200).json({ status: "success", message: "user data saved" });

  } catch (error) {
   return res.status(500).json({status: "error",message: "Internal Server Error",Error: error.message});
}
};

module.exports = {
  getProduct,

  addProductToWishList,
  getProductsByCategory,
  getProductsBySubCategory,
  getProductFromWishlist,
  addProductToCart,
  getProductFromCart,
  getSingleProduct,
  removeSingleProductFromWishlist,
  removeSingleProductFromCart,
  getAllReivewsGiven,
  deleteReview,
  saveOrderDetails,
  getPurchaseItems,
};
