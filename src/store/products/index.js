const initialProductsState = {
  allProducts: [
    {
      category: 'food',
      name: 'Dry Food',
      description: '1lb of dry kibbles for your pets',
      price: '$9.99',
      inventory: 1000
    },
    {
      category: 'food',
      name: 'Wet Food',
      description: '1lb of wet kibbles for your pets',
      price: '$13.99',
      inventory: 1000
    },
    {
      category: 'accessories',
      name: 'Leash',
      description: 'A leash for your pets not your kids',
      price: '$15.99',
      inventory: 300
    },
    {
      category: 'accessories',
      name: 'Collar',
      description: 'A collar for your pet',
      price: '$9.99',
      inventory: 300
    },
  ]
}

const productsReducer = (state = initialProductsState, action) => {
  switch(action.type) {
    case 'FILTER_PRODUCTS':
    default:
      return state;
  }
}

export default productsReducer;