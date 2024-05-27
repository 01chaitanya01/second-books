import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const notifySuccess = (message) => toast.success(message, {
        position: "top-center",
        autoClose: 2000,
    });

    const notifyError = (message) => toast.error(message, {
        position: "top-center",
        autoClose: 2000,
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);


            const response = await axios.post('http://localhost:8000/api/users/login', data);

            if (response.status === 200) {
                localStorage.setItem("userInfo", JSON.stringify(data))
                localStorage.setItem("hashedOtp", response.data.hashedOtp)
                // Handle successful login response
                notifySuccess(response.data.message);
                setTimeout(() => {
                    navigate("/auth/loginOtp");
                }, 1500);
                // Perform any action needed after successful login
            } else {
                console.error('Login failed:', response.data.message);
                notifyError(response.data.message);
            }

            console.log(data)

            setLoading(false);
        } catch (error) {
            console.error('Error during login:', error.message);
            notifyError(error.response.data.message);
            setLoading(false);
        }
    };

    return (
        <>
            <form className='register-form-sub-container' onSubmit={handleSubmit(onSubmit)}>
                <h1>Sign In</h1>
                <div className="register-form">
                    <div className="register-form-input">
                        <div>
                            <p>Email</p>
                            <input type="email" name='email' placeholder='Enter Email ID' {...register("email", {
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
                            <p>Don't have an account</p> <Link to="/auth/register">Sign up</Link>
                        </div>
                        <button className='register-btn'>Submit</button>
                    </div>
                </div>
            </form>
            {loading ? <Loader /> : ""}
            <ToastContainer />
        </>
    );
};

export default Login;
