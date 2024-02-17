import React from "react";
import Departments from "../Departments";
import Products from '../Products';
import SimpleCart from '../SimpleCart';

function Storefront () {

  return(
    <div id='storefront-wrapper'>
      {/* <Departments/> */}
      {/* <hr /> */}
      <Products/>
      <SimpleCart />      
    </div>
  )

}

export default Storefront;