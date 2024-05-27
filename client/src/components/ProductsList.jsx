import React, { useEffect, useState } from 'react'
import "../styles/productslist.css"
import { Link } from 'react-router-dom';

import axios from 'axios';

import LoadingProducts from './LoadingProducts';
import AddToCart from './AddToCart';

const ProductsList = () => {

    const [products, setProducts] = useState([])

    const [Loading, setLoading] = useState(false);

    const [limit, setLimit] = useState(8)

    const getAllProduct = async () => {
        try {
            // const response = await axios.get("https://fakestoreapi.com/products");
            setLoading(true)
            const response = await axios.get("http://localhost:8000/api/products/getAllProducts");
            // setProducts((prev) => [...prev, ...response.data]);
            setProducts(response.data.data);
            console.log("Data fetched successfully:", response.data.data);
            setLoading(false)
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false)
        }
    }

    const handleInfinitScroll = async () => {
        try {
            // console.log("scroll height" + document.documentElement.scrollHeight)
            // console.log("inner Height" + window.innerHeight)
            // console.log("scroll top" + document.documentElement.scrollTop)

            const innerHeight = window.innerHeight;
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop


            // if (scrollTop + innerHeight + 1 >= scrollHeight) {
            //     setLimit((prev) => prev + 8);
            // }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // if (limit <= 21) {
        console.log("Fetching data...");
        getAllProduct();
        console.log("The limit of the products", limit)
        // }
    }, [limit]);

    useEffect(() => {
        window.addEventListener("scroll", handleInfinitScroll)

        return () => window.removeEventListener("scroll", handleInfinitScroll)
    }, [])


    return (
        <div className='products-list'>
            <div className="product-card">

                {Loading ?
                    <>
                        <LoadingProducts />
                        <LoadingProducts />
                        <LoadingProducts />
                        <LoadingProducts />
                        <LoadingProducts />
                        <LoadingProducts />
                        <LoadingProducts />
                        <LoadingProducts />
                    </> : " "
                }

                {products.map((book, index) => (
                    <div key={index} className="book-item">
                        <Link to={`/productdetail/${book.bID}`}>
                            <div className="product-image">
                                <img src={book.imagepath} alt="" />
                            </div>
                        </Link>
                        <div className="product-info">
                            <Link to={`/productdetail/${book.bID}`}>
                                <p>{book.bookname}</p>
                            </Link>
                            <p>Price: {book.price}</p>
                            {/* <button className='addtocart'>Add to cart</button> */}
                            <AddToCart bookID={book.bID} />
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default ProductsList;
