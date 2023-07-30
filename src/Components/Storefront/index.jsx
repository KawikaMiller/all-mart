import React from "react";
import Categories from "../Categories";
import Products from '../Products';
import SimpleCart from '../SimpleCart';

function Storefront () {

  return(
    <div id='storefront-wrapper'>
      {/* <Categories/> */}
      {/* <hr /> */}
      <Products/>
      <SimpleCart />      
    </div>
  )

}

export default Storefront;