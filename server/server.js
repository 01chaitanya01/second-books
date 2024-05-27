const express = require("express");
const dotenv = require("dotenv").config();
const db = require("./config/dbConnection");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors({
    Credential: true
}));

const port = process.env.PORT || 5000;

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

// Using routes
app.use("/api/users", userRoutes);
app.use("/api/products/", productRoutes);

// Attempting to connect to the database
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Database connected!');
    connection.release(); // Release the connection back to the pool
});

// Starting the server
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});