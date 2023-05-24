import Header from "./index";
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from "react-redux";
import { createStore } from "redux";
import storefrontReducer from "../../store";
import userEvent from "@testing-library/user-event";

describe('Testing Header component...', () => {

  const store = createStore(storefrontReducer);
  let cartState = store.getState().cart;

  test('Header should be visible', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    )

    expect(screen.getByText('Pet Store')).toBeVisible()
    expect(screen.getByText('Cart')).toBeVisible()
  })

  xtest('Click cart should trigger toggleCart', () => {
    
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    )

    handleClick = jest.fn()
    userEvent.click(screen.getByText('Cart'));
    expect(handleClick).toBeCalled();
  })

})