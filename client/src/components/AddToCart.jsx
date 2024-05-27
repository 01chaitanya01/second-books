import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddToCart = ({ bookID }) => {

    const authToken = localStorage.getItem("authToken");

    const [userId, setUserId] = useState();

    const [inCart, setInCart] = useState(false);

    const [addToCartSuccess, setAddToCartSuccess] = useState(false);

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

    const addToCart = async () => {
        try {
            if (!authToken) {
                console.log("Error: Auth token not found.");
                // notifyError("please login")
                return;
            }

            const response = await axios.post('http://localhost:8000/api/products/addToCart', { bookID }, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (response.data.success) {
                setInCart(true)
                setAddToCartSuccess(true)
                setTimeout(() => {
                    setAddToCartSuccess(false)
                }, 3000)
                console.log("Added to cart:", response.data.message); // Log the response data
                // notifySuccess("Item added to cart")
            } else {
                console.log("fail to add in cart:", response.data.message); // Log the response data
                // notifySuccess("Fail to add Item in cart")
            }
        } catch (error) {
            console.log("Error adding to cart:", error);
        }
    };

    const checkInCart = async () => {
        try {
            if (!userId) {
                console.log("Error: userID not found");
                return;
            }

            const response = await axios.post('http://localhost:8000/api/products/checkInCart', { bookID, userId });

            if (response.data.success) {
                setInCart(false)
                // console.log(response.data)
            } else {
                setInCart(true)
            }
        } catch (error) {

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
        <>
            {inCart ?
                <button className={`addtocart ${addToCartSuccess ? "addToCartSuccess" : ""}`}>Go to Cart</button>
                :
                <button onClick={addToCart} className={`addtocart `}>Add to cart</button>
            }

        </>
    );
};

export default AddToCart;
