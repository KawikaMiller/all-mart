const initialCartState = {
  items: [

  ],
  total: 0
}

const cartReducer = (state = initialCartState, action) => {
  switch(action.type){
    case 'ADD_TO_CART':
    case 'REMOVE_FROM_CART':
    case 'MODIFY_QUANTITIY':
    default:
       return state;
  }
}

export default cartReducer;