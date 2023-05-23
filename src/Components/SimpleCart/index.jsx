import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function SimpleCart(props) {

  const cartState = useSelector(storefrontState => storefrontState.cart);

  return(
    <>
    </>
  )

}

export default SimpleCart;