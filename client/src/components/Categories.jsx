import React, { useEffect, useState } from 'react';
import "../styles/categories.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Categories = () => {
    const [categories, setCategories] = useState([]);

    const [Loading, setLoading] = useState(false);

    const getAllCategories = async () => {
        try {
            setLoading(true)
            const response = await axios.get("http://localhost:8000/api/products/getAllCategories");
            setCategories(response.data.categories);
            console.log("Success getting data");
            setLoading(false)
        } catch (error) {
            console.error("Error getting data:", error);
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    useEffect(() => {
        console.log("Categories:", categories);
    }, [categories]); // Log categories whenever it changes

    return (
        <div className='categories'>

            <div style={{ display: Loading ? "flex" : "none" }}>
                <div className="categories-section" style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
                    <h1>Categories</h1>
                    <SkeletonTheme baseColor="#adb5bd" highlightColor="#ced4da">
                        <li><Skeleton style={{ padding: "5px" }} /></li>
                        <li><Skeleton style={{ padding: "5px" }} /></li>
                        <li><Skeleton style={{ padding: "5px" }} /></li>
                        <li><Skeleton style={{ padding: "5px" }} /></li>
                    </SkeletonTheme>
                </div>
            </div>


            <div className="categories-section">
                <h1>Categories</h1>
                {/* Render categories here */}
                <ul>
                    {categories.map((category, index) => (
                        <Link to={`/category/${category.name}`} className='categories-btn'><li key={index} >{category.name}</li></Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Categories;
