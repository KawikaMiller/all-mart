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

export const fetchCategories = () => async(dispatch) => {
  let response = await fetch('https://api-js401.herokuapp.com/api/v1/categories');
  let data = await response.json();
  console.log('FETCH CATEGORIES: ', data)

  dispatch({
    type: 'FETCH_CATEGORIES',
    payload: data
  })
}


const categoryReducer = (state = initialCategoryState, action) => {
  switch (action.type) {
    case 'SET_ACTIVECATEGORY':
      return{
        categories: state.categories,
        activeCategory: state.categories.find(category => category.display === action.payload)
      }
    case 'CLEAR_ACTIVECATEGORY':
      return{
        categories: state.categories,
        activeCategory: {}
      }
    case 'FETCH_CATEGORIES':
      console.log('REDUCER: ', action.payload.results)
        return{
          ...state,
          categories: action.payload.results
        }
    default: 
      return state;
  }
}

export default categoryReducer;