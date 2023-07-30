import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Typography } from "@mui/material";
import categoriesSlice, { fetchCategories } from "../../store/categories";
import { Link } from "react-router-dom";

function CategoriesPage(props){

  const categories = useSelector(storefrontState => storefrontState.categories);
  const dispatch = useDispatch();

  let { setAllCategories } = categoriesSlice.actions;

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
            <Link
              to={`../products`}
              state={{category: category}}
              style={{textDecoration: 'none'}}
            >
              <Paper 
                key={`category_${category.name}`}
                elevation={4} 
                className={`categoryPageSelector ${category.name}`}
              >
                  {category.name[0].toUpperCase() + category.name.slice(1)}
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

export default CategoriesPage;