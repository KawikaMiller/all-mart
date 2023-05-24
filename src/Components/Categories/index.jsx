import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Paper, Typography } from "@mui/material";
import { fetchCategories } from "../../store/categories";

function Categories (props) {

  const categories = useSelector(storefrontState => storefrontState.categories);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    if (event.target.innerText === categories.activeCategory.name) {
      dispatch({
        type: 'CLEAR_ACTIVECATEGORY',
        payload: ''
      })
      let categorySelectors = document.getElementsByClassName('activeCategory');
      for (let i = 0; i < categorySelectors.length; i++ ){
        categorySelectors[i].classList.remove('activeCategory')
      }
    } else {
      dispatch({
        type: 'SET_ACTIVECATEGORY',
        payload: event.target.innerText
      })
      let categorySelectors = document.getElementsByClassName('activeCategory');
      for (let i = 0; i < categorySelectors.length; i++ ){
        categorySelectors[i].classList.remove('activeCategory')
      }
      event.target.classList.add('activeCategory');      
    }

  }

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  return (
    categories.categories ? 
    <>
      <Typography>Categories:</Typography>
      <Container id='categoryContainer' data-testid='categoryContainer'>
        {categories.categories.map(category => {
          return (
            <Paper 
              key={`paper_${category.name}`}
              data-testid={`paper_${category.name}`} 
              onClick={handleClick} 
              elevation={4} 
              className="categorySelector"
            >
              {category.name[0].toUpperCase() + category.name.slice(1)}
            </Paper>
          )
        })}
      </Container>    
    </>
    : 
    null
  )

}

export default Categories;