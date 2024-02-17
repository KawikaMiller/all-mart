import SimpleCart from './index';
import { Provider } from "react-redux";
import { createStore } from "redux";
import storefrontReducer from '../../store';

import { render, screen, fireEvent, act } from '@testing-library/react';
// import userEvent from "@testing-library/user-event";

describe('Testing SimpleCart component...', () => {

  test('SimpleCart component should NOT BE visible until state changes', () => {

    const store = createStore(storefrontReducer);

    render(
      <Provider store={store}>
        <SimpleCart />
      </Provider>
    )

    expect(screen.queryByText('Checkout')).toBeFalsy();

  })

  test('SimpleCart component should BE visible when state is changed', () => {
    const store = createStore(storefrontReducer);

    render(
      <Provider store={store}>
        <SimpleCart />
      </Provider>
    )

    let showCart = store.getState().cart.showCart

    expect(screen.queryByText('Checkout')).toBeFalsy();

    act(() => store.dispatch({
      type: 'TOGGLE_CART',
      payload: !showCart,
    }))

    expect(screen.getByText('Checkout')).toBeVisible();
  })

  test('Item(s) and subtotal is visible in cart', () => {
    const store = createStore(storefrontReducer);

    render(
      <Provider store={store}>
        <SimpleCart />
      </Provider>
    )

    act(() => store.dispatch({
      type: 'ADD_TO_CART',
      payload: {
        department: 'department',
        name: 'name',
        description: 'description',
        price: 9.99,
        quantity: 1
      }
    }))

    let showCart = store.getState().cart.showCart

    act(() => store.dispatch({
      type: 'TOGGLE_CART',
      payload: !showCart,
    }))

    expect(screen.getByText('name x 1')).toBeVisible()
    expect(screen.getByText('Checkout')).toBeVisible()
    expect(screen.getByText('SubTotal: $9.99')).toBeVisible();

  })

})