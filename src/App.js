import React from "react";
import { Provider } from "react-redux";
import storefrontReducer from "./store";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Products from "./Components/Products";
import ShoppingCart from "./Components/ShoppingCart";
import { configureStore } from "@reduxjs/toolkit";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductDetails from "./Components/ProductDetails";

import './style/app.scss';
import Banner from "./Components/Banner";
import DepartmentsPage from "./Components/DepartmentsPage";

// const storeFront = createStore(storefrontReducer, applyMiddleware(thunk));
let storeFront = configureStore({reducer: storefrontReducer})

function App() {
  return (
    <Provider store={storeFront}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Banner />} />
        </Routes>
        <div component='main' id='mainContainer'>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/products/:department" element={<Products />} />
            <Route path='/products/:id' element={<ProductDetails />} />
            <Route path="/cart" element={<ShoppingCart />} />
          </Routes>
        </div>      
      </BrowserRouter>
      <Footer />      
    </Provider>
  );
}

export default App;
