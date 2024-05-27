import React from 'react';
import "../styles/homepage.css";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// import ImageSlider from 'react-simple-image-slider';
import ImageSlider from './ImageSlider';
import ProductsList from './ProductsList';

import image1 from "../images/images1.jpeg";
import image2 from "../images/image2.png";
import image3 from "../images/images3.jpeg";
import image4 from "../images/image4.jpeg";
import image5 from "../images/image5.png";
// import image5 from "../images/logo.png";





const slides = [
    { url: image1, title: "beach" },
    { url: image2, title: "beach" },
    { url: image3, title: "beach" },
    { url: image4, title: "beach" },
    { url: image5, title: "beach" },
];

const containerStyles = {
    width: "100%",
    height: "280px",
    margin: "0 auto",
    // zIndex: "-1"
};


const HomePage = () => {

    return (
        <div className='homepage-container'>
            {/* <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <p>
                    <Skeleton count={3} />
                </p>
            </SkeletonTheme> */}

            <div>
                <div style={containerStyles}>
                    <ImageSlider slides={slides} />
                </div>
            </div>

            <ProductsList />

        </div>
    )
}

export default HomePage;
