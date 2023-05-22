import React from "react";
import { useSelector, useDispatch } from "react-redux";

function Categories (props) {

  const categories = useSelector(storefrontState => storefrontState.categories);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    dispatch({
      type: 'SET_ACTIVECATEGORY',
      payload: event.target.innerText
    })
  }

  return (
    props.categories ? 
    <>
      {props.categories.map(category => {
        return <p onClick={handleClick}>{category.display}</p>
      })}
      <p>{categories.activeCategory.display}</p>     
    </>

    : 
    null
  )

}

export default Categories;