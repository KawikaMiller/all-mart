import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Drawer } from "@mui/material";

function SimpleCart(props) {

  const cartState = useSelector(storefrontState => storefrontState.cart);
  const dispatch = useDispatch();

  const removeItemFromCart = (product) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: product
    })
  }

  const toggleCart = () => {
    dispatch({
      type: 'TOGGLE_CART',
      payload: !cartState.showCart
    })
  }

  return(
    <React.Fragment key='right' onClick={toggleCart}>
      <Drawer anchor="right" open={cartState.showCart} onClose={toggleCart}>
        {cartState.items.map(item => <p onClick={() => {removeItemFromCart(item)}}>{item.name} x {item.quantity}</p>)}
        <p>SubTotal: ${cartState.total.toFixed(2)}</p>
      </Drawer>    
    </React.Fragment>

  )

}

export default SimpleCart;