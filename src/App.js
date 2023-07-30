import React from "react";
import { Provider } from "react-redux";
import storefrontReducer from "./store";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Products from "./Components/Products";
import Storefront from "./Components/Storefront";
import ShoppingCart from "./Components/ShoppingCart";
import { configureStore } from "@reduxjs/toolkit";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Container } from "@mui/material";
import ProductDetails from "./Components/ProductDetails";

import './style/app.scss';
import Banner from "./Components/Banner";
import CategoriesPage from "./Components/CategoriesPage";

// const storeFront = createStore(storefrontReducer, applyMiddleware(thunk));
let storeFront = configureStore({reducer: storefrontReducer})

function App() {
  return (
    <Provider store={storeFront}>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Banner />} />
        </Routes>
        <Container component='main' id='mainContainer'>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/products" element={<Products />} />
            <Route path='/products/:id' element={<ProductDetails />} />
            <Route path="/cart" element={<ShoppingCart />} />
          </Routes>
        </Container>      
      </BrowserRouter>
      <Footer />      
    </Provider>
  );
}

export default App;
