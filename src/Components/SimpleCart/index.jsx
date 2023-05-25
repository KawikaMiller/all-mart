import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Drawer, Button, Typography, Container, Box } from "@mui/material";
import { removeItemFromCart } from "../../store/cart";
import { modifyCartItemQuantity } from "../../store/cart";
import { Link } from "react-router-dom";

function SimpleCart(props) {

  const cartState = useSelector(storefrontState => storefrontState.cart);
  const dispatch = useDispatch();

  const removeItem = (product) => {
    dispatch(removeItemFromCart(product))
  }

  const modifyItemInCart = (event, product) => {
    dispatch(modifyCartItemQuantity(product, parseInt(event.target.value)))
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
        data-testid='cart' 
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
                <Button variant='contained' color='error' onClick={() => {removeItem(item)}}>Remove</Button>                
                <Box>
                  <Button variant='contained' value={1} onClick={(event) => modifyItemInCart(event, item)}>+</Button>
                  <Button variant='contained' value={-1} onClick={(event) => modifyItemInCart(event, item)}>-</Button>                  
                </Box>
              </Box>


            </Container>

          )
        })}
        </div> 


        <Button variant="contained" onClick={() => {console.log('https://imgflip.com/s/meme/Shut-Up-And-Take-My-Money-Fry.jpg')}} style={{padding: '0'}}>
          <Link to={'/cart'} style={{width: '100%', padding: '0.5rem'}} state={{cart: cartState}}>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
              <Typography align="center" variant="button">Checkout</Typography>
              <Typography align="center" variant='caption' >SubTotal: ${cartState.total.toFixed(2)}</Typography >            
            </Box>          
          </Link>
        </Button>

      </Drawer>    
    </React.Fragment>

  )

}

export default SimpleCart;