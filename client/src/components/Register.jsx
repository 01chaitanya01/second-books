import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate()

    const [userInfo, setUserInfo] = useState({});

    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const notifySuccess = (message) => toast.success(message, {
        position: "top-center",
        autoClose: 2000,
    });

    const notifyError = (message) => toast.error(message, {
        position: "top-center",
        autoClose: 2000,
    });

    const onSubmit = (data) => {
        setUserInfo(data);
        console.log(userInfo)
        userRegister(data);
    }


    const userRegister = async (data) => {
        try {

            setLoading(true)

            const response = await axios.post('http://localhost:8000/api/users/register', data);

            if (response.status === 200) {
                localStorage.setItem('userInfo', JSON.stringify(data));
                localStorage.setItem('hashedOtp', response.data.hashedOtp)
                notifySuccess(response.data.message)
                setTimeout(() => {
                    navigate("/auth/registerOtp");
                }, 1500);
            } else {
                console.error('Registration failed:', response.data.message);
                notifyError(response.data.message)
            }

            setLoading(false)
        } catch (error) {
            console.error('Error during registration:', error.message);
            notifyError(error.response.data.message)
            setLoading(false)
        }

    }

    return (
        <>
            <form className='register-form-sub-container' onSubmit={handleSubmit(onSubmit)}>
                <h1>Sign Up</h1>
                <div className="register-form">
                    <div className="register-form-input">
                        <div>
                            <p>First Name</p>
                            <input type="text" name='name' placeholder='Enter your Name' {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 6,
                                    message: "Enter your full name",
                                }
                            })} />
                            <p className='error-paragraph'>{errors?.name?.message}</p>
                        </div>

                        <div>
                            <p>Last Name</p>
                            <input type="text" name='lastName' placeholder='Enter your Name' {...register("lastName", {
                                required: "Last Name is required",
                                minLength: {
                                    value: 6,
                                    message: "Enter your full name",
                                }
                            })} />
                            <p className='error-paragraph'>{errors?.name?.message}</p>
                        </div>

                        <div>
                            <p>Email</p>
                            <input type="email" name='email' placeholder='Enter your Email id' {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Invalid email address',
                                },
                            })} />
                            <p className='error-paragraph'>{errors?.email?.message}</p>

                        </div>

                    </div>
                    <div className='register-button-container'>
                        <div>
                            <p>Already have an account</p> <Link to="/auth/login">Sign in</Link>
                        </div>
                        <button className='register-btn' >Submit</button>
                    </div>

                </div>
                {loading ? <Loader /> : ""}
            </form>

            <ToastContainer />

        </>

    )
}

export default Register
