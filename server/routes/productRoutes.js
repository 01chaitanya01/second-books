const express = require("express");
const router = express.Router();

const {
    getAllProducts,
    getBookById,
    getCategories,
    getCategoriesByCategoryId,
    addToCart,
    removeFromCart,
    getUserId,
    checkInCart
} = require("../controllers/productController");

const { verifyToken } = require("../controllers/userController");

router.get("/getAllProducts", getAllProducts);
router.get("/getProductById/:bookID", getBookById);
router.get("/getAllCategories", getCategories);
router.get("/getProductBycategory/:categoryName", getCategoriesByCategoryId);
router.post('/addToCart', verifyToken, addToCart); // Changed route to use verifyToken middleware
router.get("/removeFromCart/:cartID", removeFromCart);
router.post("/getUserId", verifyToken, getUserId);
router.post("/checkInCart", checkInCart)

module.exports = router;