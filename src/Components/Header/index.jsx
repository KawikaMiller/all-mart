import React from "react";
import { Typography, AppBar, Toolbar, Button, OutlinedInput, InputAdornment, Badge } from "@mui/material";

import { ShoppingCart, AccountCircle, Search, Store, DirectionsCar, } from '@mui/icons-material';
// import {  LocalShipping, ShoppingBag, } from '@mui/icons-material';

import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../../store/cart";
import Categories from "../Categories";
// import { Link } from "react-router-dom";

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
              <a href="/" style={{textDecoration: 'none', color: 'white'}}>All-Mart</a>
            </Typography>
            <div style={{display: 'flex', width: '50%', justifyContent: 'space-evenly'}}>
              <Typography>
              <a href="../categories" style={{textDecoration: 'none', color: 'white'}}>Products</a>
              </Typography>
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
              endAdornment={
                <InputAdornment position="start">
                  <Search sx={{color: 'white'}}/>
                </InputAdornment>
              }
            />
            
            <Button
              color='inherit'
            >
              <AccountCircle />
            </Button>

            <Button 
              color="inherit" 
              onClick={toggleCart}
            >
              <Badge badgeContent={`${cartState.items.reduce((acc, current) => (acc + current.quantity), 0)}`}>
                <ShoppingCart />
              </Badge>
            </Button>
          </div>

        </Toolbar>

        <div>
          <hr/>
        </div>
        
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 1rem'}}>

          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '15%'}}>

            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <DirectionsCar />
              <Typography>Pick-Up</Typography>              
            </div>
            
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Store />
              <Typography variant='subtitle1'>Store Location</Typography>              
            </div>

          </div>
          
          <Categories />

        </div>
      </AppBar>      
  )

}

export default Header;