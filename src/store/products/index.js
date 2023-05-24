const initialProductsState = {
  allProducts: [
    {
      category: 'food',
      name: 'Dry Food',
      description: '1lb of dry kibbles for your pets',
      price: 9.99,
      stock: 5
    },
    {
      category: 'food',
      name: 'Wet Food',
      description: '1lb of wet kibbles for your pets',
      price: 13.99,
      stock: 1000
    },
    {
      category: 'accessories',
      name: 'Leash',
      description: 'A leash for your pets not your kids',
      price: 15.99,
      stock: 300
    },
    {
      category: 'accessories',
      name: 'Collar',
      description: 'A collar for your pet',
      price: 9.99,
      stock: 300
    },
  ]
}

export const fetchProducts = () => async (dispatch) => {
  let response = await fetch('https://api-js401.herokuapp.com/api/v1/products');
  let data = await response.json()
  console.log('FETCHED PRODUCTS: ', data)

  dispatch({
    type: 'FETCH_PRODUCTS',
    payload: data.results
  })
}

export const addItemToCart = (productId) => async (dispatch) => {
  let response = await fetch(`https://api-js401.herokuapp.com/api/v1/products/${productId}`);
  let product = await response.json()

  if (product.inStock <= 0){
    console.error('Item is no longer in stock')
  } else {

    try{

      let body = {inStock: product.inStock - 1};

      fetch(`https://api-js401.herokuapp.com/api/v1/products/${productId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(body)
      })
      .then( response =>{
        console.log(response);
        dispatch({
          type: 'ADD_TO_CART',
          payload: {
            _id: product._id,
            category: product.category,
            name: product.name,
            // description: product.description,
            price: product.price,
            quantity: 1
          }
        })}        
      )
      .catch(err => {
        console.log('Error making PUT request to update product stock', err)
      })

    } catch(e){
      console.log('Could not make PUT request', e)
    }
  }
}

const productsReducer = (state = initialProductsState, action) => {
  switch(action.type) {
    case 'UPDATE_STOCK':
      let products = [...state.allProducts]

      let foundProduct = products.find(item => item.name === action.payload.name);

      foundProduct.stock -= action.payload.quantity;

      return{
        allProducts: products
      }
    case 'FETCH_PRODUCTS':
      return{
        ...state,
        allProducts: action.payload
      }
    default:
      return state;
  }
}

export default productsReducer;