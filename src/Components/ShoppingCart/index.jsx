import React, { useState } from "react";
import { useLocation } from "react-router";
import { Card, CardContent, CardHeader, Typography, Box, Button, TextField, Container } from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function ShoppingCart() {

  let { state } = useLocation();

  const [CVV, setCVV] = useState(undefined);
  const [zipCode, setZipCode] = useState(undefined);
  const [cardNumber, setCardNumber] = useState(undefined);

  const handleNumberChange = (event, limit, setFunc) => {
    if(event.target.value.toString().length <= limit){
      setFunc(event.target.value)
    }
  }

  return(
    <Container sx={{marginTop: '4rem', marginBottom: '4rem'}}>
    <Card>
      <CardHeader title={'Order Summary'} />
      <CardContent>
        {state.cart.items.map(item => (
          <Box>
            <Card sx={{margin: '0.5rem'}}>
              <CardContent sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                  <Typography variant='body1'>{`${item.name} x${item.quantity}`}</Typography>
                  <Typography variant='subtitle1'>{`$${item.price}/ea`}</Typography>
                </div>
                <div>
                  {/* <Typography variant='body1'>{`$${item.price}/ea`}</Typography> */}
                  <Typography variant='h6'>{`$${item.quantity * item.price}`}</Typography>
                </div>
              </CardContent>
            </Card>
          </Box>
        ))}
        <Box>
          <Card sx={{margin: '0.5rem'}}>
            <CardContent sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Typography variant="h4" >Total</Typography>
              <Typography variant="h4">{`$${state.cart.items.reduce((acc, current) => {return acc + (current.price * current.quantity)}, 0).toFixed(2)}`}</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{marginTop: '2rem', padding: '1rem'}}>
          <Typography variant="h5" sx={{marginBottom: '1rem'}}>Customer Info</Typography>
            <form>
              <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} >
                  <div>
                  <TextField
                    id="outlined"
                    label='First Name'
                    />
                  <TextField
                    id="outlined"
                    label='Last Name'
                    />                    
                  </div>
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
                    type="tel"
                    label='Zip'
                    value={zipCode}
                    onChange={(event) => handleNumberChange(event, 5, setZipCode)}
                    />                
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                  <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <TextField
                      id="outlined"
                      type="tel"
                      label='Card Number'
                      value={cardNumber}
                      onChange={(event) => handleNumberChange(event, 16, setCardNumber)}
                      />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker />                
                    </LocalizationProvider>
                    <TextField
                      id="outlined"
                      type="tel"
                      label='CVV'
                      value={CVV}
                      onChange={(event) => handleNumberChange(event, 4, setCVV)}
                      />                     
                  </Box>

                  <Box sx={{alignSelf: 'center'}}>
                    <Button 
                      variant="contained" 
                      // type="submit" 
                      onClick={(event) => {
                        event.preventDefault();
                        alert('Thank you for your purchase!');
                      }}
                      >
                      Submit Order
                    </Button>               
                  </Box>   
                </Box>
              </Box>
            </form>            
        </Box>        
      </CardContent>

    </Card>
    </Container>

  )

}

export default ShoppingCart;