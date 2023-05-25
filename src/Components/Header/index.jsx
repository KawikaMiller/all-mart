import React from "react";
import { Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from "react-redux";

function Header(props) {

  const cartState = useSelector(storefrontState => storefrontState.cart);

  const dispatch = useDispatch();

  const toggleCart = () => {
    dispatch({
      type: 'TOGGLE_CART',
      payload: !cartState.showCart
    })
  }

  return(
    <Box component='header' id='storeHeader' sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pet Store
          </Typography>
          <Button color="inherit" onClick={toggleCart}>{`Cart (${cartState.items.reduce((acc, current) => (acc + current.quantity), 0)})`}</Button>
        </Toolbar>
      </AppBar>      
    </Box>
  )

}

export default Header;