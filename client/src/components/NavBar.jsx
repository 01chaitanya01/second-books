import React, { useEffect, useState } from 'react'
import { FaUserLarge, FaAngleDown, FaBars, FaCirclePlus, FaMagnifyingGlass } from "react-icons/fa6";
import logo from "../images/logo.png"
import logo2 from "../images/logo2.png"
import { Link } from 'react-router-dom';
import "../styles/navbar.css"
import axios from 'axios';

const NavBar = () => {

    const isUserSignedIn = !!localStorage.getItem('authToken')

    const [openProfileSubBar, setOpenProfileSubBar] = useState(false);

    const openprofile = () => {
        setOpenProfileSubBar(!openProfileSubBar)
    }

    const [openMenu, setOpenMenu] = useState(false);

    const openMenuBtn = () => {
        setOpenMenu(!openMenu);
    }

    const [openSubMenu1, setOpenSubMenu1] = useState(false);

    const [openSubMenu2, setOpenSubMenu2] = useState(false);

    const openSubMenuBtn1 = () => {
        setOpenSubMenu1(!openSubMenu1);
        // setOpenSubMenu2(false)
    }

    const openSubMenuBtn2 = () => {
        setOpenSubMenu2(!openSubMenu2);
        // setOpenSubMenu1(false)
    }

    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 99.2) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [categories, setCategories] = useState([]);

    const getAllCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/products/getAllCategories");
            setCategories(response.data.categories);
            console.log("Success getting data");
        } catch (error) {
            console.error("Error getting data:", error);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("authToken")
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    useEffect(() => {
        console.log("Categories:", categories);
    }, [categories]); // Log categories whenever it changes

    return (
        <div className='navbar-container'>
            <div className="top-navbar-main">
                <div className="top-navbar">
                    <div className='search-bar'>
                        <input type="text" placeholder='search for any book' />
                        <button><FaMagnifyingGlass /></button>
                    </div>
                    {
                        isUserSignedIn ?
                            <div className='profile-bar' onClick={openprofile}>
                                <FaUserLarge />
                                <div className={`sub-profile-bar ${openProfileSubBar ? "open-profile-sub-bar" : ""}`}>
                                    <li>Account</li>
                                    <li>Checkout</li>
                                    <li onClick={handleLogout}>Logout</li>
                                </div>
                            </div>
                            :
                            <div className="auth-links">
                                <Link to="/auth/login"><span className='signin-btn'>SignIn</span></Link>
                            </div>
                    }




                    <div className='logo-container'>
                        <div className='logo'>
                            <img src={logo} alt="" />
                            <img src={logo2} alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className={`main-navbar ${isSticky ? "sticky-nav" : ""}`}>
                {/* <div className="main-navbar-container"> */}
                <nav className={`main-navbar-container ${openMenu ? "open-main-navbar-container" : ""}`}>
                    <div className='nav-link-btn' onClick={openMenuBtn}><Link to="/" className='nav-link'><li>Home</li></Link></div>
                    <div className='nav-link'>
                        <div className='nav-link-btn'>
                            <Link onClick={openMenuBtn}>Books</Link>
                            <span className='down-arrow'><FaAngleDown className='down-arrow-icon' /> <FaCirclePlus className='plus-icon' onClick={openSubMenuBtn1} /></span>
                        </div>
                        <div className={`nav-sub-link ${openSubMenu1 ? "open-nav-sub-link" : ""}`}>
                            <li>trending books</li>
                            <li>trending books</li>
                            <li>trending books</li>
                            <li>trending books</li>
                        </div>
                    </div>
                    <div className='nav-link'>
                        <div className='nav-link-btn' >
                            <Link to="/categories">Category </Link>
                            <span className='down-arrow'><FaAngleDown className='down-arrow-icon' /> <FaCirclePlus className='plus-icon' onClick={openSubMenuBtn2} /></span>
                        </div>
                        <div className={`nav-sub-link ${openSubMenu2 ? "open-nav-sub-link" : ""}`} >
                            {categories.map((categories, index) => (
                                <Link to={`/category/${categories.name}`} onClick={openMenuBtn}><li key={index}>{categories.name}</li></Link>
                            ))}
                        </div>
                    </div>
                    <div className="nav-link-btn">
                        <Link className='cart-btn' to="/mycart"><li>Go To Cart</li></Link>
                    </div>
                </nav>
                {/* </div> */}
                <div className="menu-bar-container">
                    <FaBars className='menu-bar' onClick={openMenuBtn} />
                </div>
            </div>


        </div>


    )
}

export default NavBar