import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Typography } from "@mui/material";
import categoriesSlice, { fetchCategories } from "../../store/categories";

function CategoriesPage(props){

  const categories = useSelector(storefrontState => storefrontState.categories);
  const dispatch = useDispatch();

  let { setAllCategories, setActiveCategory, clearActiveCategory } = categoriesSlice.actions;

  // clears active category if the active category is clicked on, otherwise sets an non-active category to the active category
  const handleClick = (event) => {
    // set active category in state
    dispatch(setActiveCategory(event.target.innerText));
    // load 'products' page, only show products in active category
    window.location='./products';
  }

  useEffect(() => {
    dispatch(fetchCategories())
    .then(response => dispatch(setAllCategories(response.results)))
  }, []) //eslint-disable-line

  return (
    categories.categories ? 
    <div id='categoriesPage'>
      <Typography id='categoriesPageHeader' variant="h4">Categories:</Typography>
      <hr/>
      <div id='categoriesPageContainer'>
        {categories.categories.map(category => {
          return (
            <Paper 
              key={`category_${category.name}`}
              onClick={handleClick} 
              elevation={4} 
              className={`categoryPageSelector ${category.name}`}
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

export default CategoriesPage;