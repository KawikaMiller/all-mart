import React from "react";
import bg from '../../assets/main.jpeg'

import { Button, Paper, Typography } from "@mui/material";

function Banner() {

  return(
    <Paper id='banner' sx={{background: `linear-gradient(rgba(255, 0, 0, 0.2), rgba(255, 0, 0, 0.2)), url(${bg})`}}>
      <Typography variant="h1">
        All-Mart
      </Typography>
      <Typography variant="h4">
        Everything, Everywhere, All at All-Mart
      </Typography>
      <hr />
      <Button variant="contained" color="error" sx={{padding: '1rem', width: '25%', color: 'white', border: '2px solid white'}} href="./categories">
        <Typography variant="h6">
          Shop Now
        </Typography>
      </Button>
    </Paper>
  )

}

export default Banner;