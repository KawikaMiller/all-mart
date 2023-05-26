import Header from "./index";
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from "react-redux";
import { createStore } from "redux";
import storefrontReducer from "../../store";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

describe('Testing Header component...', () => {

  const store = createStore(storefrontReducer, applyMiddleware(thunk));

  test('Header should be visible', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    )

    expect(screen.getByText('Belethors General Goods')).toBeVisible()
    expect(screen.getByText('Cart (0)')).toBeVisible()
  })

  test('Simulate clicking on `Cart` button and toggling the `showCart` state', () => {
    
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    )

    let showCartState = store.getState().cart.showCart;

    store.dispatch({
      type: 'TOGGLE_CART',
      payload: !showCartState
    })

    expect(store.getState().cart.showCart).toBe(true)
    expect(fireEvent.click(screen.getByText('Cart (0)'))).toBe(true);

    showCartState = store.getState().cart.showCart;

    store.dispatch({
      type: 'TOGGLE_CART',
      payload: !showCartState
    })

    expect(store.getState().cart.showCart).toBe(false)
  })

})