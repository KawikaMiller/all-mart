import React from "react";
import { Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../../store/cart";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

function Header(props) {

  const cartState = useSelector(storefrontState => storefrontState.cart);
  let {toggleShowCart} = cartSlice.actions
  const dispatch = useDispatch();

  const toggleCart = () => {
    dispatch(toggleShowCart())
  }

  return(
      <AppBar position="static" sx={{justifyContent: 'center'}}>
        <Toolbar sx={{justifyContent: 'space-between'}}>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '60%'}} >
            <Typography variant="h4" sx={{justifySelf: 'center' }}>
              All-Mart
            </Typography>
            <div style={{display: 'flex', width: '50%', justifyContent: 'space-evenly'}}>
              <Typography>Products</Typography>
              <Typography>About</Typography>
              <Typography>On Sale</Typography>
            </div>
          </div>

          <div style={{display: 'flex', alignItems: 'center'}}>
            <OutlinedInput
              id='searchbar'
              size="small"
              placeholder="Search"
              sx={{color: 'white', borderRadius: '20px'}}
              startAdornment={
                <InputAdornment>
                  <SearchIcon sx={{color: 'white'}}/>
                </InputAdornment>
              }
            />
            
            <Button
              color='inherit'
            >
              <AccountCircleIcon />
            </Button>

            <Button 
              color="inherit" 
              onClick={toggleCart}
            >
              <ShoppingCartIcon />
              {`(${cartState.items.reduce((acc, current) => (acc + current.quantity), 0)})`}
            </Button>
          </div>

        </Toolbar>
      </AppBar>      
  )

}

export default Header;