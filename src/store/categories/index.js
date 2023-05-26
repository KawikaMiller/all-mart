import { createSlice } from "@reduxjs/toolkit";

const initialCategoryState = {
  categories: [
    {
      name: 'food',
      display: 'Pet Food',
      description: 'Food for your pets!'
    },
    {
      name: 'accessories',
      display: 'Pet Accessories',
      description: 'Accessories for your pets!'
    },
  ],
  activeCategory: {},
}

export const fetchCategories = () => async() => {
  let response = await fetch('https://api-js401.herokuapp.com/api/v1/categories');
  let data = await response.json();

  return data
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    activeCategory: {},
  },
  reducers: {
    setActiveCategory(state, action){
      state.activeCategory = state.categories.find(category => category.name === action.payload.toLowerCase())
    },
    clearActiveCategory(state, action){
      state.activeCategory = action.payload
    },
    setAllCategories(state, action){
      state.categories = action.payload
    }
  }
})


// const categoryReducer = (state = initialCategoryState, action) => {
//   switch (action.type) {
//     case 'SET_ACTIVECATEGORY':
//       return{
//         categories: state.categories,
//         activeCategory: state.categories.find(category => category.name === action.payload.toLowerCase())
//       }
//     case 'CLEAR_ACTIVECATEGORY':
//       return{
//         categories: state.categories,
//         activeCategory: {}
//       }
//     case 'FETCH_CATEGORIES':
//         return{
//           ...state,
//           categories: action.payload
//         }
//     default: 
//       return state;
//   }
// }

export default categoriesSlice;