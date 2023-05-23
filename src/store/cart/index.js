const initialCartState = {
  items: [

  ],
  total: 0
}

const cartReducer = (state = initialCartState, action) => {
  switch(action.type){
    case 'ADD_TO_CART':
      // console.log('ADD TO CART ACTION TRIGGERED')
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price
      };
    case 'REMOVE_FROM_CART':
    case 'MODIFY_QUANTITY':
      // console.log('MODIFY QUANTITY ACTION TRIGGERED')
      let prevItems = [...state.items];
      prevItems.find(item => item.name === action.payload.name).quantity++;
      console.log(prevItems);
      return {
        ...state,
        items: prevItems,
        total: state.total + action.payload.price
      };
    default:
       return state;
  }
}

export default cartReducer;