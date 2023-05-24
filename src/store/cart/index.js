const initialCartState = {
  items: [

  ],
  total: 0,
  showCart: false,
}

export const removeItemFromCart = (product) => async (dispatch) => {
  let response = await fetch(`https://api-js401.herokuapp.com/api/v1/products/${product._id}`);
  let foundProduct = await response.json()

  try{
    let body = {inStock: foundProduct.inStock + product.quantity};
    fetch(`https://api-js401.herokuapp.com/api/v1/products/${product._id}`, {
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
        type: 'REMOVE_FROM_CART',
        payload: product._id
      })}        
    )
    .catch(err => {
      console.log('Error making PUT request to update product stock', err)
    })

  } catch(e){
    console.log('Could not make PUT request', e)
  }
}

export const modifyCartItemQuantity = (product, quantityChange) => async (dispatch) => {
  // find cart item id in server products
  let response = await fetch(`https://api-js401.herokuapp.com/api/v1/products/${product._id}`);
  let foundProduct = await response.json()
  // update server side stock
  try{
    let body = {inStock: foundProduct.inStock - quantityChange};
    fetch(`https://api-js401.herokuapp.com/api/v1/products/${product._id}`, {
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
        type: 'MODIFY_ITEM_QUANTITY',
        payload: {
          product: product,
          quantityChange: quantityChange
        }
      })}        
    )
    .catch(err => {
      console.log('Error making PUT request to update product stock', err)
    })

  } catch(e){
    console.log('Could not make PUT request', e)
  }
  // update cart quantity
}

const cartReducer = (state = initialCartState, action) => {
  switch(action.type){
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price
      };
    case 'REMOVE_FROM_CART':
      let remainingItems = state.items.filter(item => item._id !== action.payload);

      let newTotal = remainingItems.reduce((acc, current) => {return acc + (current.price * current.quantity)}, 0)

      return {
        ...state,
        items: remainingItems,
        total: newTotal,
      }
    case 'MODIFY_ITEM_QUANTITY':
      let cartItems = [...state.items];

      let foundItem = cartItems.find(item => item.name === action.payload.product.name);
      
      foundItem.quantity += action.payload.quantityChange;

      if(foundItem.quantity === 0) {
        cartItems = state.items.filter(item => item.name !== action.payload.product.name)
      }

      let modifiedTotal = cartItems.reduce((acc, current) => {return acc + (current.price * current.quantity)}, 0)

      return {
        ...state,
        items: cartItems,
        total: modifiedTotal
      };
    case 'TOGGLE_CART':
      return {
        ...state,
        showCart: action.payload
      }
    default:
       return state;
  }
}

export default cartReducer;