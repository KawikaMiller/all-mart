import React from "react";
import { useLocation } from "react-router";
import { Card, CardActions, CardContent, CardHeader, Typography, CardMedia, Box, Button, TextField } from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function ShoppingCart() {

  let { state } = useLocation();

  return(
    <Card>
      <CardHeader title={'Order Summary'} />
      <CardContent>
        {state.cart.items.map(item => (
          <Box>
            <Card sx={{margin: '0.5rem'}}>
              <CardContent sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant='body1'>{item.name}</Typography>
                <Typography variant='body1'>{`$${item.price}`}</Typography>                   
              </CardContent>
            </Card>
          </Box>
        ))}
        <Box>
          <Card sx={{margin: '0.5rem'}}>
            <CardContent sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Typography variant="h6" >Total</Typography>
              <Typography variant="h6">{`$${state.cart.items.reduce((acc, current) => {return acc + (current.price * current.quantity)}, 0)}`}</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{marginTop: '2rem'}}>
          <Typography variant="h5" sx={{marginBottom: '1rem'}}>Customer Info</Typography>
          <Box >
            <form>
              <Box sx={{display: 'flex'}}>
                <TextField
                  id="outlined"
                  label='Full Name'
                />
                <TextField
                  id="outlined"
                  label='Street Address'
                />
                <TextField
                  id="outlined"
                  label='City'
                />
                <TextField
                  id="outlined"
                  label='State'
                />
                <TextField
                  id="outlined"
                  type="number"
                  label='Zip'
                />                
              </Box>
              <Box>
                <TextField
                  id="outlined"
                  type="number"
                  label='Card Number'
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker />                
                </LocalizationProvider>
                <TextField
                  id="outlined"
                  type="number"
                  label='CVV'
                />   
              </Box>          
            </form>            
          </Box>

        </Box>        
      </CardContent>
      // add the mock-form
      // add notification on submit / 'purchase' / 'confirm order'    
    </Card>

  )

}

export default ShoppingCart;