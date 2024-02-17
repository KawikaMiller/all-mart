import { createSlice } from "@reduxjs/toolkit";

export const fetchDepartments = () => async() => {
  let response = await fetch('http://localhost:3001/api/v1/departments');

  let data = await response.json();
  console.log('fetchDepartments() =>', data)
  return data
}

const departmentsSlice = createSlice({
  name: 'departments',
  initialState: {
    departments: [],
    activeDepartment: {},
  },
  reducers: {
    setActiveDepartment(state, action){
      state.activeDepartment = state.departments.find(department => department.name === action.payload);
    },
    clearActiveDepartment(state, action){
      state.activeDepartment = action.payload
    },
    setAllDepartments(state, action){
      console.log('setAllDepartments() =>', action.payload)
      state.departments = action.payload
    }
  }
})


export default departmentsSlice;