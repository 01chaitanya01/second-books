import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import HomePage from './components/HomePage';
import Header from './components/NavBar';
import ProductsList from './components/ProductsList';
import ProductDetail from './components/ProductDetail';
import Categories from './components/Categories';
import CategoryProducts from './components/CategoryProducts';
import Authentication from './components/Authentication';
import Profile from './components/Profile';
import Cart from './components/Cart';

function App() {

  const isUserSignedIn = !!localStorage.getItem('authToken')

  return (
    <div className="App">
      <Router>
        {/* <header className="App-header">
          <NavBar />
        </header> */}
        <Routes>

          <Route path="/" element={
            <>
              <HomePage />
              <Header />
            </>
          } />

          <Route path="/productslist" element={
            <>
              <ProductsList />
              <Header />
            </>
          } />

          <Route path="/productdetail/:productID" element={
            <>
              <ProductDetail />
              <Header />
            </>
          } />

          <Route path="/categories" element={
            <>
              <Categories />
              <Header />
            </>
          } />

          <Route path="/category/:categoryName" element={
            <>
              <CategoryProducts />
              <Header />
            </>
          } />

          <Route path="/auth/:authType" element={
            <>
              <Authentication />
              <Header />
            </>
          } />

          <Route path="/profile"
            element={<PrivateRoute
              navBar={Header}
              component={Profile}
              authenticated={isUserSignedIn}
            />}
          />

          <Route path="/mycart"
            element={<PrivateRoute
              navBar={Header}
              component={Cart}
              authenticated={isUserSignedIn}
            />}
          />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
