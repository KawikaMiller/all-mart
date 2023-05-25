import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import storefrontReducer from "./store";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Storefront from "./Components/Storefront";
import ShoppingCart from "./Components/ShoppingCart";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Container } from "@mui/material";
import thunk from "redux-thunk";
import ProductDetails from "./Components/ProductDetails";

const storeFront = createStore(storefrontReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={storeFront}>
      <Header />
      <BrowserRouter>
        <Container component='main' id='mainContainer'>
          <Routes>
            <Route path="/" element={<Storefront />} />
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
