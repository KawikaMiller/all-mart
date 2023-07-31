import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";

import { Container, Typography } from "@mui/material";

import productsSlice from "../../store/products";
import cartSlice from "../../store/cart";
import { modifyServerSideStock } from "../../store/cart";
import { addItemToCart, fetchProductsFromServer } from "../../store/products";

import categoriesSlice from "../../store/categories";
import ProductCard from "../ProductCard";

function Products() {

  const productState = useSelector(storefrontState => storefrontState.products);
  const categoryState = useSelector(storefrontState => storefrontState.categories);
  const cartState = useSelector(storefrontState => storefrontState.cart);
  const linkState = useLocation();
  const dispatch = useDispatch();

  let {setAllProducts} = productsSlice.actions;
  let {setActiveCategory} = categoriesSlice.actions
  let {addToCart, modifyItemQuantity} = cartSlice.actions;


  const handleAddToCart = (product) => {
    // if product IS NOT in cart, add it to cart
    if (!cartState.items.find(item => item._id === product._id)) {
      dispatch(addItemToCart(product._id))
      .then(dispatch(addToCart(product)));  
    } 
    // otherwise, the product IS in the cart and we need to update the quantity of the item
    else {
      console.log('add to cart again')
      dispatch(modifyServerSideStock(product, 1))
      .then(dispatch(modifyItemQuantity({
        product,
        quantityChange: 1
      })));
    }
  }

  // fetches product data when component mounts (when page loads)
  useEffect(() => {
    dispatch(fetchProductsFromServer())
    .then(response => dispatch(setAllProducts(response.results)));

    if(linkState.state?.category){
      dispatch(setActiveCategory(linkState.state.category.name))
    }
  }, []) // eslint-disable-line 

  // fetches product data from the server any time our cart is modified so that the state stays in sync with whats on the server
  useEffect(() => {
    dispatch(fetchProductsFromServer())
    .then(results => dispatch(setAllProducts(results.results)));
  }, [cartState]) // eslint-disable-line

  return(
    <>
      <div id='productsHeader'>
        <Typography variant="h5" >
          {categoryState.activeCategory?.name ? categoryState.activeCategory?.name : 'All Products'}
        </Typography>
      </div>
      <div key='productsContainer' id='productsContainer'>
        {/* If a product category has been selected, only display products within that category */}
        {categoryState.activeCategory?.name ?

          productState.allProducts.map(product => {
            if(product.category === categoryState.activeCategory.name){
              return <ProductCard product={product} handleAddToCart={handleAddToCart}/>
            } else return null;
          })   
        : 
          // If no product category is selected, display all products
          productState.allProducts.map(product => {
            return <ProductCard product={product} handleAddToCart={handleAddToCart} />
          })
        }
      </div>
    </>
  )
}

export default Products;