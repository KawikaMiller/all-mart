import { createSlice } from "@reduxjs/toolkit";

export const fetchProductsFromServer = () => async () => {
  let response = await fetch('https://api-js401.herokuapp.com/api/v1/products');
  let data = await response.json();

  return data;
}

export const addItemToCart = (productId) => async () => {
  
  // find product on server side
  let response = await fetch(`https://api-js401.herokuapp.com/api/v1/products/${productId}`);
  let product = await response.json()

  // check if product is in stock
  if (product.inStock <= 0){
    console.error('Item is no longer in stock')
  } 
  
  else {
    // update stock on server side
    let body = {inStock: product.inStock - 1};
    await fetch(`https://api-js401.herokuapp.com/api/v1/products/${productId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body)
    });
  }
}

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [],
  },
  reducers: {
    setAllProducts(state, action){
      state.allProducts = action.payload;
    },
  }
})

export default productsSlice;