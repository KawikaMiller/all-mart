import { createSlice } from "@reduxjs/toolkit";

export const reStockServer = (product) => async () => {
  // find product on server side
  let response = await fetch(`http://localhost:3001/api/v1/products/${product.id}`);
  let foundProduct = await response.json()

  // update stock on server side
  let body = {stock: foundProduct.stock + product.quantity};
  await fetch(`http://localhost:3001/api/v1/products/${product.id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(body)
  })
}

export const modifyServerSideStock = (product, quantityChange) => async () => {
  // find cart item id in server products
  let response = await fetch(`http://localhost:3001/api/v1/products/${product.id}`);
  console.log(response)
  let foundProduct = await response.json()

  console.log(foundProduct)

  // if we are trying to increment an item's quantity in our cart AND the product is out of stock, then we throw an error
  if (quantityChange > 0 && foundProduct.stock <= 0) {
    throw new Error('Unable to add more of this item to your cart. Item may be out of stock.')
  }

  // update server side stock
  let body = {stock: foundProduct.stock - quantityChange};

  await fetch(`http://localhost:3001/api/v1/products/${product.id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(body)
  })
}

const saveToLocalStorage = (stateItems, stateTotal) => {
  const localCart = JSON.stringify({
    items: stateItems,
    total: stateTotal
  })
  localStorage.setItem('allMartCart', localCart)
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
    showCart: false,
    orderMethod: 'Pick-Up',
    location: '12345'
  },
  reducers: {
    addToCart(state, action){
      let item = {
        id: action.payload.id,
        department: action.payload.department,
        name: action.payload.name,
        price: action.payload.price,
        quantity: 1
      }
      state.items = [...state.items, item];
      state.total = state.total + action.payload.price;

      saveToLocalStorage(state.items, state.total);
    },
    removeFromCart(state, action){
      // filter array so that the remaining items are the ones that DO NOT MATCH the id of the item we want to remove
      let remainingItems = state.items.filter(item => item.id !== action.payload.id);

      // recalculate the total
      let newTotal = remainingItems.reduce((acc, current) => {return acc + (current.price * current.quantity)}, 0);

      // set state
      state.items = remainingItems;
      state.total = newTotal;

      saveToLocalStorage(state.items, state.total);
    },
    modifyItemQuantity(state, action){
      let cartItems = [...state.items];
      console.log('cartItems => ', cartItems)
      let foundItem = cartItems.find(item => item.name === action.payload.product.name);
      console.log('foundItem => ', foundItem)
      
      foundItem.quantity += action.payload.quantityChange;

      if(foundItem.quantity === 0) {
        cartItems = state.items.filter(item => item.name !== action.payload.product.name)
      }

      let modifiedTotal = cartItems.reduce((acc, current) => {return acc + (current.price * current.quantity)}, 0);

      state.items = cartItems;
      state.total = modifiedTotal;

      saveToLocalStorage(state.items, state.total);
    },
    toggleShowCart(state, action){
      state.showCart = !state.showCart
    },
    setCart(state, action){
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.showCart = false;
    },
    setOrderType(state, action){
      state.orderMethod = action.payload;
    }
  }
})

export default cartSlice;