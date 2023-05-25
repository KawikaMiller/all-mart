import React from "react";
import { useLocation } from "react-router";

function ShoppingCart() {

  let { state } = useLocation();

  console.log('SHOPPING CART STATE: ',state)

  return(
    <>
      {state.cart.items.map(item => (
        <p>{item.name}</p>
      ))}
      <p>${state.cart.total}</p>
      // add the mock-form
      // add notification on submit / 'purchase' / 'confirm order'    
    </>

  )

}

export default ShoppingCart;