import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, AppBar, Toolbar, Button, OutlinedInput, InputAdornment, Badge, Select, MenuItem, FormControl } from "@mui/material";

import { ShoppingCart, AccountCircle, Search, LocationOn, DirectionsCar, LocalShipping, ShoppingBag, } from '@mui/icons-material';

import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../../store/cart";
import Categories from "../Categories";

function Header(props) {

  const cartState = useSelector(storefrontState => storefrontState.cart);
  let { toggleShowCart, setCart, setOrderType } = cartSlice.actions
  const dispatch = useDispatch();

  const toggleCart = () => {
    dispatch(toggleShowCart())
  }

  const handleChange = (event) => {
    dispatch(setOrderType(event.target.value))
  }

  // loads cart from local storage when webpage loads
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem('allMartCart'));

    if(localCart){
      dispatch(setCart({
        items: localCart.items,
        total: localCart.total
      }))
    }
  }, []) //eslint-disable-line

  return (
    <AppBar position="static" sx={{ justifyContent: 'center' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>

        <div id='leftSideNav' >
          <Typography variant="h4" sx={{ justifySelf: 'center' }}>
            <Link
              to="/"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              All-Mart
            </Link>
          </Typography>
          <div id='navLinks'>
            <Typography>
              <Link
                to="../categories"
                style={{ textDecoration: 'none', color: 'white' }}
              >
                Products
              </Link>
            </Typography>
            <Typography>About</Typography>
            <Typography>On Sale</Typography>
          </div>
        </div>

        <div id='rightSideNav'>
          <OutlinedInput
            id='searchbar'
            size="small"
            placeholder="Search"
            sx={{ color: 'white', borderRadius: '20px' }}
            endAdornment={
              <InputAdornment position="start">
                <Search sx={{ color: 'white' }} />
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
        <hr />
      </div>

      <div id='bottomNav'>

        <div id='bottomLeftNav'>

          <div id='orderMethodContainer'>
            <FormControl id='orderMethod'>
              <Select
                fullWidth
                variant="standard"
                value={cartState.orderMethod}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    {
                      cartState.orderMethod === 'Pick-Up' ?
                        <DirectionsCar />
                        :
                        cartState.orderMethod === 'Shipping' ?
                          <LocalShipping />
                          :
                          cartState.orderMethod === 'Delivery' ?
                            <ShoppingBag />
                            :
                            null
                    }
                  </InputAdornment>
                }
              >
                <MenuItem value={'Pick-Up'}>Pick-Up</MenuItem>
                <MenuItem value={'Shipping'}>Shipping</MenuItem>
                <MenuItem value={'Delivery'}>Delivery</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div id='storeLocation'>
            <LocationOn />
            <Typography variant='subtitle1'>Store Location</Typography>
          </div>

        </div>

        <Categories />

      </div>
    </AppBar>
  )

}

export default Header;