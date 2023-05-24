import Categories from './index';
import { Provider } from "react-redux";
import { createStore } from "redux";
import storefrontReducer from '../../store';

import { render, screen, fireEvent, act } from '@testing-library/react';
// import userEvent from "@testing-library/user-event";

describe('Testing Categories component...', () => {

  test('Categories component should be visible', () => {
    const store = createStore(storefrontReducer);
    let categoryState = store.getState().categories;

    render(
      <Provider store={store}>
        <Categories categories={categoryState.categories}/>
      </Provider>
    )

    expect(screen.getByTestId('paper_food')).toBeVisible();
    expect(screen.getByTestId('paper_accessories')).toBeVisible();
  })

  test('Simulating changing active category', () => {
    const store = createStore(storefrontReducer);
    let categoryState = store.getState().categories;

    render(
      <Provider store={store}>
        <Categories categories={categoryState.categories}/>
      </Provider>
    )
    
    act(() => store.dispatch({
      type:'SET_ACTIVECATEGORY',
      payload: 'Pet Food'
    }))

    expect(store.getState().categories.activeCategory.display).toBe('Pet Food')

    act(() => store.dispatch({
      type:'SET_ACTIVECATEGORY',
      payload: ''
    }))

    expect(store.getState().categories.activeCategory?.display).toBeFalsy();
  })

})