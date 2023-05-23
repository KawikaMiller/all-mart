import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function SimpleCart(props) {

  const cartState = useSelector(storefrontState => storefrontState.cart);
  const dispatch = useDispatch();

  const removeItemFromCart = (product) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: product
    })
  }

  return(
    <>
    {cartState.items.map(item => <p onClick={() => {removeItemFromCart(item)}}>{item.name} x {item.quantity}</p>)}
    <p>SubTotal: ${cartState.total.toFixed(2)}</p>
    </>
  )

}

export default SimpleCart;