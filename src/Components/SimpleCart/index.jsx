import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Drawer, Button, Typography, Container, Box } from "@mui/material";

function SimpleCart(props) {

  const cartState = useSelector(storefrontState => storefrontState.cart);
  const productState = useSelector(storefrontState => storefrontState.products);
  const dispatch = useDispatch();

  const removeItemFromCart = (product) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: product
    })
  }

  const modifyItemInCart = (event, product) => {
    // if we are increasing the quantity of an item in the cart
    if (parseInt(event.target.value) > 0){

      let foundProduct = productState.allProducts.find(item => item.name === product.name)

      if (foundProduct.stock > 0) {

        dispatch({
          type: 'MODIFY_QUANTITY',
          payload: {
            name: product.name,
            quantity: parseInt(event.target.value)
          }
        })
    
        dispatch({
          type: 'UPDATE_STOCK',
          payload: {
            name: product.name,
            quantity: parseInt(event.target.value)
          }
        })

      } else {
        console.error(`There are no more ${product.name} in stock`)
      }

    } 
    // else we are decreasing the quantity of an item in the cart
    else if (parseInt(event.target.value) < 0){
      
      dispatch({
        type: 'MODIFY_QUANTITY',
        payload: {
          name: product.name,
          quantity: parseInt(event.target.value)
        }
      })

      dispatch({
        type: 'UPDATE_STOCK',
        payload: {
          name: product.name,
          quantity: parseInt(event.target.value)
        }
      })     
    }
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


        <Button variant="contained" onClick={() => {console.log('https://imgflip.com/s/meme/Shut-Up-And-Take-My-Money-Fry.jpg')}}>
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography align="center" variant="button">Checkout</Typography>
            <Typography align="center" variant='caption' >SubTotal: ${cartState.total.toFixed(2)}</Typography >            
          </Box>
        </Button>

      </Drawer>    
    </React.Fragment>

  )

}

export default SimpleCart;