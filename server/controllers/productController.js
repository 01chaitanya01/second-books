const pool = require("../config/dbConnection");
const { param } = require("../routes/productRoutes");


const getUserId = async (req, res) => {
    try {
        const email = req.user.userId;

        const [userID] = await pool.promise().query("SELECT userID FROM users where email = ? ", email)

        console.log("this is the user id : ", userID[0].userID)

        return res.status(200).json({ success: true, message: "success getting userid", data: userID[0].userID })
    } catch (error) {
        console.error("Error getting userid:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const [allProducts] = await pool.promise().query("SELECT * FROM booksTable")

        return res.status(200).json({ success: true, message: "success data fetching", data: allProducts });
    } catch (error) {
        console.log("Error getting all the products");
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

const getBookById = async (req, res) => {
    try {
        const bookID = req.params.bookID;
        const product = await pool.promise().query("SELECT * FROM booksTable WHERE bID = ?", bookID)

        return res.status(200).json({ success: true, message: "success data fetching", data: product[0] })
    } catch (error) {
        console.log("Error fetching data ", error)
        return res.status(500).json({ success: false, message: "Internal server Error" })
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await pool.promise().query("SELECT * FROM categories")

        return res.status(200).json({ success: true, message: "success categories fetching", categories: categories[0] })
    } catch (error) {
        console.log("error fetching categories", error)
        return res.status(500).json({ success: false, message: "Internal server Error" })
    }
}

const getCategoriesByCategoryId = async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        console.log(categoryName)

        const productByCategory = await pool.promise().query("SELECT * FROM booksTable WHERE category = ?", categoryName);

        return res.status(200).json({ success: true, message: "category wise product fetch success", product: productByCategory[0] })
    } catch (error) {
        console.log("Error fetching product by category id ", error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

const addToCart = async (req, res) => {
    try {
        const { bookID } = req.body;

        const email = req.user.userId;

        const [userID] = await pool.promise().query("SELECT userID FROM users where email = ? ", email)
        const [bookids] = await pool.promise().query("SELECT bookID FROM CartItems WHERE userID = ? ", [userID[0].userID])

        const allBookIds = bookids.map(book => book.bookID)

        // console.log("this is add to cart", bookID)
        // console.log("this is the user id : ", userID[0].userID)
        if (allBookIds.includes(bookID)) {
            return res.status(200).json({ success: false, message: "product already in cart" })
        }

        const [result] = await pool.promise().query("INSERT INTO CartItems(userID, bookID) VALUES (?, ?)", [userID[0].userID
            , bookID]);

        // return res.status(200).json({ success: true, message: "Added to cart" });


        if (result.affectedRows > 0) {
            console.log("Data inserted successfully");

            return res.status(200).json({ success: true, message: "Added to cart" });
        } else {
            console.log("Failed to insert data");
            return res.status(500).json({ success: false, message: "Failed to add in cart" });
        }
    } catch (error) {
        console.error("Error inserting data:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const removeFromCart = async (req, res) => {
    try {
        const cartID = req.params.cartID;

        const [result] = await pool.promise().query("DELETE FROM cart WHERE cartID = ?", cartID);

        if (result.affectedRows > 0) {
            console.log("Data inserted successfully");

            return res.status(200).json({ success: true, message: "removed from cart" });
        } else {
            console.log("Failed to insert data");
            return res.status(500).json({ success: false, message: "Failed to remove from cart" });
        }
    } catch (error) {
        console.error("Error inserting data:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const checkInCart = async (req, res) => {
    try {
        const { bookID, userId } = req.body;

        const [result] = await pool.promise().query("SELECT bookID FROM CartItems WHERE userID = ? ", [userId])

        const allBookIds = result.map(book => book.bookID)
        console.log(allBookIds)

        var queryData = [allBookIds]

        const [products] = await pool.promise().query("SELECT * FROM booksTable WHERE bID IN (?)", queryData)

        console.log(queryData)

        console.log(products)

        if (allBookIds.includes(bookID)) {
            return res.status(200).json({ success: false, message: "book already in cart" })
        }

        return res.status(200).json({ success: true, messsage: "success check", data: allBookIds, products: products })
    } catch (error) {
        console.error("Error Checking cart:", error);
        return res.status(500).json({ success: false, message: "Internal server error", data: "no data" });
    }
}

module.exports = {
    getAllProducts,
    getBookById,
    getCategories,
    getCategoriesByCategoryId,
    addToCart,
    removeFromCart,
    getUserId,
    checkInCart
}