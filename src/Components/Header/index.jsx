import React from "react";
import { Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../../store/cart";

function Header(props) {

  const cartState = useSelector(storefrontState => storefrontState.cart);
  let {toggleShowCart} = cartSlice.actions

  const dispatch = useDispatch();

  const toggleCart = () => {
    dispatch(toggleShowCart())
  }

  return(
    <Box component='header' id='storeHeader' sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Belethors General Goods
          </Typography>
          <Button color="inherit" onClick={toggleCart}>{`Cart (${cartState.items.reduce((acc, current) => (acc + current.quantity), 0)})`}</Button>
        </Toolbar>
      </AppBar>      
    </Box>
  )

}

export default Header;