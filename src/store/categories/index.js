import { createSlice } from "@reduxjs/toolkit";

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


export default categoriesSlice;