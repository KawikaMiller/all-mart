import categoryReducer from './categories';
import productsReducer from './products';
import { combineReducers } from 'redux';
// const {combineReducers} = require('redux');

const storefrontReducer = combineReducers({
  categories: categoryReducer,
  products: productsReducer,
})

export default storefrontReducer;