import React from "react";
import { Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../../store/cart";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header(props) {

  const cartState = useSelector(storefrontState => storefrontState.cart);
  let {toggleShowCart} = cartSlice.actions

  const dispatch = useDispatch();

  const toggleCart = () => {
    dispatch(toggleShowCart())
  }

  return(
    // <Box component='header' id='storeHeader' sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{justifyContent: 'center'}}>
        <Toolbar>
          <Typography variant="h2" sx={{ flexGrow: 1, justifySelf: 'center' }}>
            All-Mart
          </Typography>
          <Button 
            color="inherit" 
            onClick={toggleCart}>
              <ShoppingCartIcon />
              {`Cart (${cartState.items.reduce((acc, current) => (acc + current.quantity), 0)})`}
          </Button>
        </Toolbar>
      </AppBar>      
    // </Box>
  )

}

export default Header;