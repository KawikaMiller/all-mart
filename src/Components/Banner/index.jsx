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
      <Button variant="contained" sx={{padding: '1.25rem', width: '20%'}} href="#categories">
        <Typography variant="h6">
          Shop Now
        </Typography>
      </Button>
    </Paper>
  )

}

export default Banner;