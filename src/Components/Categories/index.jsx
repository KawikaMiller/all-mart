import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Paper, Typography } from "@mui/material";
import categoriesSlice, { fetchCategories } from "../../store/categories";

function Categories (props) {

  const categories = useSelector(storefrontState => storefrontState.categories);
  const dispatch = useDispatch();

  let { setAllCategories, setActiveCategory, clearActiveCategory } = categoriesSlice.actions;

  // clears active category if the active category is clicked on, otherwise sets an non-active category to the active category
  const handleClick = (event) => {
    if (event.target.innerText.toLowerCase() === categories.activeCategory.name) {
      dispatch(clearActiveCategory({}))
      let categorySelectors = document.getElementsByClassName('activeCategory');
      for (let i = 0; i < categorySelectors.length; i++ ){
        categorySelectors[i].classList.remove('activeCategory')
      }
    } else {
      dispatch(setActiveCategory(event.target.innerText))
      let categorySelectors = document.getElementsByClassName('activeCategory');
      for (let i = 0; i < categorySelectors.length; i++ ){
        categorySelectors[i].classList.remove('activeCategory')
      }
      event.target.classList.add('activeCategory');      
    }

  }

  useEffect(() => {
    dispatch(fetchCategories())
    .then(response => dispatch(setAllCategories(response.results)))
  }, 
  // eslint-disable-next-line
  [])

  return (
    categories.categories ? 
    <div id='categories'>
      {/* <Typography id='categories-header' variant="h4">Categories:</Typography> */}
      <div id='categoryContainer' data-testid='categoryContainer'>
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
      </div>    
    </div>
    : 
    null
  )

}

export default Categories;