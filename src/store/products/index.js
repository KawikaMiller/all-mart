import { createSlice } from "@reduxjs/toolkit";

export const fetchProductsFromServer = () => async () => {
  let response = await fetch('https://api-js401.herokuapp.com/api/v1/products');
  let data = await response.json();

  return data;
}

export const addItemToCart = (productId) => async (dispatch) => {
  let response = await fetch(`https://api-js401.herokuapp.com/api/v1/products/${productId}`);
  let product = await response.json()

  if (product.inStock <= 0){
    console.error('Item is no longer in stock')
  } else {
    try{
      let body = {inStock: product.inStock - 1};

      fetch(`https://api-js401.herokuapp.com/api/v1/products/${productId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(body)
      })
      .then( response =>{
        console.log(response);
        dispatch({
          type: 'ADD_TO_CART',
          payload: {
            _id: product._id,
            category: product.category,
            name: product.name,
            // description: product.description,
            price: product.price,
            quantity: 1
          }
        })}        
      )
      .catch(err => {
        console.log('Error making PUT request to update product stock', err)
      })

    } catch(e){
      console.log('Could not make PUT request', e)
    }
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