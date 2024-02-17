import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";
import departmentsSlice, { fetchDepartments } from "../../store/departments";

function Departments (props) {

  const departments = useSelector(storefrontState => storefrontState.departments);
  const dispatch = useDispatch();

  let { setAllDepartments, setActiveDepartment, clearActiveDepartment } = departmentsSlice.actions;

  // clears active department if the active department is clicked on, otherwise sets an non-active department to the active department
  const handleClick = (event) => {
    if (event.target.innerText.toLowerCase() === departments.activeDepartment?.name) {
      dispatch(clearActiveDepartment({}))
      let departmentSelectors = document.getElementsByClassName('activeDepartment');
      for (let i = 0; i < departmentSelectors.length; i++ ){
        departmentSelectors[i].classList.remove('activeDepartment')
      }
    } else {
      dispatch(setActiveDepartment(event.target.innerText))
      let departmentSelectors = document.getElementsByClassName('activeDepartment');
      for (let i = 0; i < departmentSelectors.length; i++ ){
        departmentSelectors[i].classList.remove('activeDepartment')
      }
      event.target.classList.add('activeDepartment');      
    }

  }

  useEffect(() => {
    dispatch(fetchDepartments())
    .then(response => dispatch(setAllDepartments(response)))
  }, 
  // eslint-disable-next-line
  [])

  return (
    departments.departments ? 
    <div id='departments'>
      <div id='departmentContainer' data-testid='departmentContainer'>
        {departments.departments.map(department => {
          return (
            <Link
            key={`departmentLink_${department.name}`}
            to={`../products/${department.name}`}
            state={{department: department}}
            style={{textDecoration: 'none'}}
            >
              <Paper 
                key={`paper_${department.name}`}
                data-testid={`paper_${department.name}`} 
                onClick={handleClick} 
                elevation={4} 
                className="departmentSelector"
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

export default Departments;