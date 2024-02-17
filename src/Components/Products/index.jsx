import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";

import productsSlice from "../../store/products";
import cartSlice from "../../store/cart";
import { modifyServerSideStock } from "../../store/cart";
import { addItemToCart, fetchProductsFromServer } from "../../store/products";

import departmentsSlice from "../../store/departments";
import ProductCard from "../ProductCard";
import SimpleCart from "../SimpleCart";

function Products() {

  const productState = useSelector(storefrontState => storefrontState.products);
  const departmentState = useSelector(storefrontState => storefrontState.departments);
  const cartState = useSelector(storefrontState => storefrontState.cart);
  const linkState = useLocation();
  const dispatch = useDispatch();

  let {setAllProducts} = productsSlice.actions;
  let {setActiveDepartment} = departmentsSlice.actions
  let {addToCart, modifyItemQuantity} = cartSlice.actions;


  const handleAddToCart = (product) => {
    // if product IS NOT in cart, add it to cart
    if (!cartState.items.find(item => item.id === product.id)) {
      dispatch(addItemToCart(product.id))
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
    .then(response => dispatch(setAllProducts(response)));

    if(linkState.state?.department){
      dispatch(setActiveDepartment(linkState.state.department.name))
    }
  }, []) // eslint-disable-line 

  // fetches product data from the server any time our cart is modified so that the state stays in sync with whats on the server
  useEffect(() => {
    dispatch(fetchProductsFromServer())
    .then(results => dispatch(setAllProducts(results)));
  }, [cartState]) // eslint-disable-line

  return(
    <>
      <div key='productsContainer' id='productsContainer'>
        {/* If a product department has been selected, only display products within that department */}
        {departmentState.activeDepartment?.name ?

          productState.allProducts.map((product, idx) => {
            if(product.department === departmentState.activeDepartment.name){
              return <ProductCard product={product} handleAddToCart={handleAddToCart} key={`productCard_${idx}`}/>
            } else return null;
          })   
        : 
          // If no product department is selected, display all products
          productState.allProducts.map((product, idx) => {
            return <ProductCard product={product} handleAddToCart={handleAddToCart} key={`productCard_${idx}`}/>
          })
        }
      </div>
      <SimpleCart />
    </>
  )
}

export default Products;