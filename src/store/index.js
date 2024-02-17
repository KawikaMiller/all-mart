import departmentsSlice from './departments';
import cartSlice from './cart';
import { combineReducers } from 'redux';
import productsSlice from './products';


const storefrontReducer = combineReducers({
  departments: departmentsSlice.reducer,
  products: productsSlice.reducer,
  cart: cartSlice.reducer,
})

export default storefrontReducer;