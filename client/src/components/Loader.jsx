import React from 'react'
import { MoonLoader } from 'react-spinners'

const Loader = () => {
    return (
        <div style={{ position: "absolute", height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#55565647" }}>
            <div style={{}}>
                <MoonLoader
                    color="black"
                    size={50}
                    // loading={loading}
                />
            </div>
        </div>
    )
}

export default Loader
