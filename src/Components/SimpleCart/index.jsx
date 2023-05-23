import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Drawer, Button, Typography, Container, Box } from "@mui/material";

function SimpleCart(props) {

  const cartState = useSelector(storefrontState => storefrontState.cart);
  const dispatch = useDispatch();

  const removeItemFromCart = (product) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: product
    })
  }

  const modifyItemInCart = (event, product) => {
    dispatch({
      type: 'MODIFY_QUANTITY',
      payload: {
        name: product.name,
        quantity: parseInt(event.target.value)
      }
    })
  }

  const toggleCart = () => {
    dispatch({
      type: 'TOGGLE_CART',
      payload: !cartState.showCart
    })
  }

  return(
    <React.Fragment key='right'>
      <Drawer 
        anchor="right" 
        open={cartState.showCart} 
        onClose={toggleCart}
        PaperProps={{
          sx: {
            width: `15%`,
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'space-between'
          }
        }}
      >
        <div>
        {cartState.items.map(item => {
          return (
            <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem'}}>
              <Typography variant='overline'>{item.name} x {item.quantity}</Typography>

              <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                <Button variant='contained' color='error' onClick={() => {removeItemFromCart(item)}}>Remove</Button>                
                <Box>
                  <Button variant='contained' value={1} onClick={(event) => modifyItemInCart(event, item)}>+</Button>
                  <Button variant='contained' value={-1} onClick={(event) => modifyItemInCart(event, item)}>-</Button>                  
                </Box>
              </Box>


            </Container>

          )
        })}
        </div> 

        <Typography align="center" >SubTotal: ${cartState.total.toFixed(2)}</Typography >

      </Drawer>    
    </React.Fragment>

  )

}

export default SimpleCart;