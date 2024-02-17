import Departments from './index';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import storefrontReducer from '../../store';
import { render, screen, fireEvent, act } from '@testing-library/react';
import thunk from 'redux-thunk';
// import userEvent from "@testing-library/user-event";

describe('Testing Departments component...', () => {

  test('Departments component should be visible', () => {
    const store = createStore(storefrontReducer, applyMiddleware(thunk));
    let departmentState = store.getState().departments;

    render(
      <Provider store={store}>
        <Departments departments={departmentState.departments}/>
      </Provider>
    )

    expect(screen.getByTestId('paper_food')).toBeVisible();
    expect(screen.getByTestId('paper_accessories')).toBeVisible();
  })

  test('Simulating changing active department', () => {
    const store = createStore(storefrontReducer, applyMiddleware(thunk));
    let departmentState = store.getState().departments;

    render(
      <Provider store={store}>
        <Departments departments={departmentState.departments}/>
      </Provider>
    )
    
    act(() => store.dispatch({
      type:'SET_ACTIVECATEGORY',
      payload: 'food'
    }))

    expect(store.getState().departments.activeDepartment.name).toBe('food')

    act(() => store.dispatch({
      type:'SET_ACTIVECATEGORY',
      payload: ''
    }))

    expect(store.getState().departments.activeDepartment?.name).toBeFalsy();
  })

})