// import reducer
import storefrontReducer from "../store";
// import createStore from redux
import { createStore } from "redux";
import Products from "../Components/Products";
import Categories from "../Components/Categories";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe('Testing storefront...', () => {
  const store = createStore(storefrontReducer);

  test('Can see all products when there is no active category set', () => {
    render(
      <Provider store={store}>
        <Products />
      </Provider>
    )

    expect(screen.getByText('Dry Food')).toBeVisible;
    expect(screen.getByText('Wet Food')).toBeVisible;
    expect(screen.getByText('Leash')).toBeVisible;
    expect(screen.getByText('Collar')).toBeVisible;
  })

  test('Can see only food products when food category is active', () => {
    

    render(
      <Provider store={store}>
        <Categories categories={store.getState().categories.categories} />
        <Products />
      </Provider>
    )
    
    fireEvent.click(screen.getByText('Pet Food'));
    expect(screen.getByText('Dry Food')).toBeVisible();
    expect(screen.getByText('Wet Food')).toBeVisible();
    // these tests are passing when `.not` is included AND if `.not` is not included...???
    expect(screen.getByText('Leash')).not.toBeVisible();
    expect(screen.getByText('Collar')).not.toBeVisible();

    
  })

  test('Can see only food products when food category is active', () => {
    render(
      <Provider store={store}>
        <Categories categories={store.getState().categories.categories} />
        <Products />
      </Provider>
    )

    act(() => userEvent.click(screen.getByText('Pet Accessories')));
    expect(screen.getByText('Dry Food')).not.toBeVisible;
    expect(screen.getByText('Wet Food')).not.toBeVisible;
    expect(screen.getByText('Leash')).toBeVisible;
    expect(screen.getByText('Collar')).toBeVisible;
  })

})