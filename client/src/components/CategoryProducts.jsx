import React, { useEffect, useState } from 'react'
import "../styles/productslist.css"
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';

import LoadingProducts from './LoadingProducts';

const CategoryProducts = () => {

    const [products, setProducts] = useState([])

    const [Loading, setLoading] = useState(false);

    const categoryName = useParams()

    const [limit, setLimit] = useState()

    const getAllProduct = async () => {
        try {
            setLoading(true)

            console.log(categoryName.categoryName)
            // const response = await axios.get("https://fakestoreapi.com/products");
            const response = await axios.get(`http://localhost:8000/api/products/getProductBycategory/${categoryName.categoryName}`);
            // const response = await axios.get("https://fakestoreapi.com/products?limit=8");
            setProducts(response.data.product);
            console.log("Data fetched successfully:", response.data.product);
            setLoading(false)
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false)
        }
    }

    useEffect(() => {
        console.log("Fetching data...");
        getAllProduct();
    }, [categoryName]);


    return (
        <div className='category-products-list'>
            {products.length > 0 ?
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
                                <button className='addtocart'>Add to cart</button>
                            </div>
                        </div>
                    ))}

                </div>
                :
                <div className="product-not-available">
                    <div className="not-available-icon">
                        <p className='na-icon'>NA</p>
                    </div>
                    <p>The product is not currently available but it will be soon 🙂</p>
                    <p>Explore some other <Link to="/categories">categories</Link></p>
                </div>
            }



        </div >
    );
};

export default CategoryProducts;
