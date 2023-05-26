import React from "react";
import { useLocation } from "react-router";

function ProductDetails(props) {

  // on load, fetch product information

  let { state } = useLocation();
  console.log(state);

  return(
    <>
    <p>Category: {state.product.category}</p>
    <p>inStock: {state.product.inStock}</p>
    <p>Name: {state.product.name}</p>
    <p>Price: {state.product.price}</p>
    <p>Reviews: </p>
    <p>Related Products: </p>
    </>
  )

}

export default ProductDetails;