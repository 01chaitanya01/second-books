import React, { useEffect, useState } from 'react'
import "../styles/cart.css"
import axios from "axios"

const Cart = () => {

    const [products, setProducts] = useState([])

    const [userId, setUserId] = useState()

    const bookID = 1

    const authToken = localStorage.getItem("authToken");


    const getUserId = async () => {
        try {
            if (!authToken) {
                console.log("Error: Auth token not found.");
                return;
            }

            const response = await axios.post('http://localhost:8000/api/products/getUserId', null, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            setUserId(response.data.data)
            console.log(response.data.data)

            // console.log("success getting userid:", response.data.message); // Log the response data
        } catch (error) {

        }
    }

    const checkInCart = async () => {
        try {
            if (!userId) {
                console.log("Error: userID not found");
                return;
            }

            const response = await axios.post('http://localhost:8000/api/products/checkInCart', { bookID, userId });

            if (response.data.success) {
                setProducts(response.data.products)
                console.log("this is the products", response.data.products)
            } else {
                // setInCart(true)
            }
        } catch (error) {
            console.error(error)
            console.log("Error getting Cart Items")
        }
    }

    useEffect(() => {
        getUserId()
    }, [])

    useEffect(() => {
        if (userId !== undefined) {
            checkInCart(); // Call checkInCart only when userId is set
        }
    }, [userId]);


    return (
        <div className='cart-container'>
            <div className="cart-content">
                <h1>My Cart</h1>
                {products.map((products, index) => (
                    <div className="cart-product" key={index}>
                        <div className="cart-img">
                            <img src={products.imagepath} alt="" />
                        </div>
                        <div className="cart-description">
                            <h2>{products.bookname}</h2>
                            <p><span className='bold-text'>Description : </span> {products.description}</p>
                            <p><span className='bold-text'>price :</span> {products.price}</p>
                            <p><span className='bold-text'>Qantity :</span> 1</p>

                            <div className="delete-btn">
                                <button class="noselect"><span class="text">Delete</span></button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <div className="cart-summary">
                <h1>summary</h1>

                <div className="cart-summary-description">
                    <div className="cart-summary-description-1">
                        <h3>1</h3>
                    </div>

                    <div className="cart-summary-description-2">
                        <h3>2</h3>
                    </div>

                    <div className="cart-summary-description-3">
                        <h3>3</h3>
                    </div>

                    <div className="cart-summary-description-4">
                        <h3>4</h3>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Cart
