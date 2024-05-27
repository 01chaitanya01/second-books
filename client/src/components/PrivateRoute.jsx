import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ authenticated, component: Component, navBar: NavBar }) => {
    if (!authenticated) {
        // trigger(true);
        return <Navigate to="/auth/login" />;
    }
    return (
        <>
            <Component />
            {/* {ProfileNavbar && <ProfileNavbar />} */}
            {NavBar && <NavBar />}
            {/* {Footer && <Footer />} */}
            {/* {Login && <Login />} */}
        </>
    );
};

export default PrivateRoute;