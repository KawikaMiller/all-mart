import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Paper, Typography } from "@mui/material";

function Categories (props) {

  const categories = useSelector(storefrontState => storefrontState.categories);
  const dispatch = useDispatch();

  const handleClick = (event) => {
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

  return (
    props.categories ? 
    <>
      <Typography>Categories:</Typography>
      <Container id='categoryContainer'>
        {props.categories.map(category => {
          return <Paper onClick={handleClick} elevation={4} className="categorySelector">{category.display}</Paper>
        })}
        {/* <p>{categories.activeCategory.display}</p>      */}
      </Container>    
    </>
    : 
    null
  )

}

export default Categories;