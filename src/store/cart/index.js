const initialCartState = {
  items: [

  ],
  total: 0,
  showCart: false,
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
      // console.log('REMOVE FROM CART ACTION TRIGGERED')
      let remainingItems = state.items.filter(item => item.name !== action.payload.name);

      let newTotal = remainingItems.reduce((acc, current) => {return acc + (current.price * current.quantity)}, 0)

      return {
        ...state,
        items: remainingItems,
        total: newTotal,
      }
    case 'MODIFY_QUANTITY':
      // console.log('MODIFY QUANTITY ACTION TRIGGERED')
      let cartItems = [...state.items];

      let foundItem = cartItems.find(item => item.name === action.payload.name);
      
      foundItem.quantity += action.payload.quantity;

      if(foundItem.quantity === 0) {
        cartItems = state.items.filter(item => item.name !== action.payload.name)
      }

      let modifiedTotal = cartItems.reduce((acc, current) => {return acc + (current.price * current.quantity)}, 0)

      return {
        ...state,
        items: cartItems,
        total: modifiedTotal
      };
    case 'TOGGLE_CART':
      return {
        ...state,
        showCart: action.payload
      }
    default:
       return state;
  }
}

export default cartReducer;