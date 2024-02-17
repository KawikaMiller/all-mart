import { createSlice } from "@reduxjs/toolkit";

export const fetchProductsFromServer = () => async () => {
  let response = await fetch('http://localhost:3001/api/v1/products');
  let data = await response.json();
  console.log('fetchProductsFromServer() => ', data)
  return data;
}

export const addItemToCart = (productId) => async () => {
  
  // find product on server side
  let response = await fetch(`http://localhost:3001/api/v1/products/${productId}`);
  let product = await response.json()

  // check if product is in stock
  if (product.stock <= 0){
    console.error('Item is no longer in stock')
  } 
  
  else {
    // update stock on server side
    let body = {stock: product.stock - 1};
    await fetch(`http://localhost:3001/api/v1/products/${productId}`, {
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