import React from 'react'

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingProductDetail = () => {
    return (
        <div className='product-detail-page'>
            <SkeletonTheme baseColor="#adb5bd" highlightColor="#ced4da">
                <div className="product-detail-section">
                    <div className="product-detail-img">
                        <Skeleton style={{ height: "400px" }} />
                    </div>

                    <div className="product-detail-info">
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </div>
                </div>
            </SkeletonTheme>
        </div>
    )
}

export default LoadingProductDetail
