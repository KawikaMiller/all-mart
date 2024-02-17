import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Typography } from "@mui/material";
import departmentsSlice, { fetchDepartments } from "../../store/departments";
import { Link } from "react-router-dom";

function DepartmentsPage(props){

  const departments = useSelector(storefrontState => storefrontState.departments);
  const dispatch = useDispatch();

  let { setAllDepartments } = departmentsSlice.actions;

  useEffect(() => {
    dispatch(fetchDepartments())
    .then(response => {
      console.log('USE EFFECT RESPONSE: ', response);
      dispatch(setAllDepartments(response))
    })
  }, []) //eslint-disable-line

  return (
    departments.departments ? 
    <div id='departmentsPage'>
      <Typography id='departmentsPageHeader' variant="h4">Departments:</Typography>
      <hr/>
      <div id='departmentsPageContainer'>
        {departments.departments.map(department => {
          return (
            <Link
              to={`../products/${department.name}`}
              state={{department: department}}
              style={{textDecoration: 'none'}}
            >
              <Paper 
                key={`department_${department.name}`}
                elevation={4} 
                className={`departmentPageSelector ${department.name}`}
              >
                  {department.name[0].toUpperCase() + department.name.slice(1)}
              </Paper>
            </Link>
          )
        })}
      </div>    
    </div>
    : 
    null
  )

}

export default DepartmentsPage;