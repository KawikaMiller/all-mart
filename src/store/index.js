import categoryReducer from './categories';
import productsReducer from './products';
import cartReducer from './cart';
import { combineReducers } from 'redux';


const storefrontReducer = combineReducers({
  categories: categoryReducer,
  products: productsReducer,
  cart: cartReducer,
})

export default storefrontReducer;