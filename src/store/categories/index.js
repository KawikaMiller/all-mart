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

const categoryReducer = (state = initialCategoryState, action) => {
  switch (action.type) {
    case 'SET_ACTIVECATEGORY':
      return{
        categories: state.categories,
        activeCategory: state.categories.find(category => category.display === action.payload)
      }
    case 'CLEAR_ACTIVECATEGORY':
    default: 
      return state;
  }
}

export default categoryReducer;