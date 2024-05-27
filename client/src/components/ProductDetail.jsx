import React, { useEffect, useState } from 'react'
import "../styles/productdetail.css"
import { useParams } from 'react-router-dom'
import axios from 'axios';
import AddToCart from './AddToCart';

import LoadingProductDetail from './LoadingProductDetail';

const ProductDetail = () => {

    const { productID } = useParams();

    const [productDetail, setProductDetail] = useState([])

    const [loading, setLoading] = useState()

    const fetchSpecificProduct = async () => {
        try {
            setLoading(true)
            const responce = await axios.get("http://localhost:8000/api/products/getProductById/" + productID)
            setProductDetail(responce.data.data)
            console.log(responce.data.data)
            setLoading(false)
        } catch {
            setLoading(false)
            console.error("error getting specific data")
        }
    }

    useEffect(() => {
        fetchSpecificProduct();
    }, [productID])


    return (
        <div className='product-detail-page'>

            {loading ? <LoadingProductDetail /> : " "}

            {productDetail.map((productDetail, index) => (
                <div className="product-detail-section">
                    <div className="product-detail-img">
                        <img src={productDetail.imagepath} alt="" />
                    </div>

                    <div className="product-detail-info">
                        <h2>{productDetail.bookname}</h2>
                        <p>{productDetail.description}</p>
                        <p>Price : ₹{productDetail.price}</p>
                        {/* <button className='addtocart'>Add to cart</button> */}
                        <AddToCart bookID={productDetail.bID} />
                        <button className='buynowbtn'>Buy Now</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductDetail
