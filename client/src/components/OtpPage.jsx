import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import Loader from './Loader';
import axios from 'axios';


const OtpPage = () => {

    const { authType } = useParams();
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    const hashedOtp = localStorage.getItem('hashedOtp') || " ";


    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const notifySuccess = (message) => toast.success(message, {
        position: "top-center",
        autoClose: 2000,
    });

    const notifyError = (message) => toast.error(message, {
        position: "top-center",
        autoClose: 2000,
    });

    const [userData, setUserData] = useState({
        name: userInfo.name || "",
        lastName: userInfo.lastName || "",
        email: userInfo.email || "",
        hashedOtp: hashedOtp,
        userOtp: ""
    })

    console.log(userData)

    // const onSubmit = async (data) => {
    //     setUserData(prevUserData => ({ ...prevUserData, userOtp: data.userOtp }));
    //     if (authType === "registerOtp") {
    //         if (userData.name === null || userData.userOtp === null) {
    //             notifyError("Please enter OTP")
    //         } else {
    //             submitOtp(userData)
    //         }
    //     } else {
    //         if (userData.hashedOtp === null || userData.userOtp === null) {
    //             notifyError("Please enter OTP")
    //         } else {
    //             submitOtp(userData)
    //         }
    //     }
    // }

    useEffect(() => {
        // Check if the userOtp is updated and then submit
        if (userData.userOtp !== "") {
            if ((authType === "registerOtp" && (userData.name === "" || userData.userOtp === "")) ||
                (authType !== "registerOtp" && (userData.hashedOtp === "" || userData.userOtp === ""))) {
                notifyError("Please enter OTP");
            } else {
                submitOtp(userData);
            }
        }
    }, [userData.userOtp]);

    const onSubmit = async (data) => {
        setUserData(prevUserData => ({ ...prevUserData, userOtp: data.userOtp }));
    };

    const submitOtp = async (data) => {
        try {

            setLoading(true)

            const response = await axios.post('http://localhost:8000/api/users/registerOtp', data);

            if (response.data.success) {
                notifySuccess(response.data.message)
                localStorage.removeItem('hashedOtp')
                localStorage.removeItem('userInfo')

                localStorage.setItem("authToken", response.data.accessToken)
                setTimeout(() => {
                    setLoading(false)
                    navigate("/");
                }, 1000)
            } else {
                console.error(authType === "registerOtp" ? 'Registration failed:' : "Login failed", response.data.message);
                notifyError(response.data.message)
            }

        } catch (error) {
            console.error('Error during OTP verfivication:', error.message);
            notifyError(error.response.data.message)
            setLoading(false)
        }
    }

    return (
        <form className='register-form-sub-container' onSubmit={handleSubmit(onSubmit)}>
            <h1>OTP Varification</h1>
            <div className="register-form">
                <div className="register-form-input">

                    <div>
                        <p>OTP</p>
                        <input type="text" name="userOtp" placeholder='Enter your OTP' {...register("userOtp", {
                            required: "OTP is required",
                            minLength: {
                                value: 6,
                                message: "Length should be 6 characters",
                            }
                        })} />
                        <p className='error-paragraph'>{errors?.userOtp?.message}</p>
                    </div>

                </div>
                <div className='register-button-container'>
                    <div>
                        <p>Haven't receive any otp</p> <Link to={authType === "registerOtp" ? "/auth/register" : "/auth/login"}>Go back</Link>
                    </div>
                    <button className='register-btn'>Submit</button>
                </div>

            </div>
            {loading ? <Loader /> : ""}
            <ToastContainer />
        </form>
    )
}

export default OtpPage
