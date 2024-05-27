import React from 'react'

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingProducts = () => {
    return (
        <div>
            <div>
                <div style={{ width: '250px', display: "flex", flexDirection: "column", justifyContent: "space-between", gap:"5px"}}>
                    <SkeletonTheme baseColor="#adb5bd" highlightColor="#ced4da">
                        <Skeleton className="product-image-loader" />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton style={{ padding: "5px" }} />
                    </SkeletonTheme>
                </div>
            </div>
        </div>
    )
}

export default LoadingProducts
