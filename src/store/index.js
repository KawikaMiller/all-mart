import categoriesSlice from './categories';
import cartReducer from './cart';
import { combineReducers } from 'redux';
import productsSlice from './products';


const storefrontReducer = combineReducers({
  categories: categoriesSlice.reducer,
  products: productsSlice.reducer,
  cart: cartReducer,
})

export default storefrontReducer;