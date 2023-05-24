import Categories from './index';
import { Provider } from "react-redux";
import { createStore } from "redux";
import storefrontReducer from '../../store';

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

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

  xtest('handleClick should be called when a category is clicked on', () => {
    const store = createStore(storefrontReducer);
    let categoryState = store.getState().categories;

    render(
      <Provider store={store}>
        <Categories categories={categoryState.categories}/>
      </Provider>
    )
    
    handleClick = jest.fn();

    fireEvent.click(screen.getByTestId('paper_food'));
    expect(handleClick).toHaveBeenCalled();
  })

})