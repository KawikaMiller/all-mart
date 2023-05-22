import React from "react";
import { Container, Typography } from "@mui/material";

function Header(props) {

  return(
    <Container component='header' id='storeHeader'>
      <Typography variant="h2" component='h2'>Pet Store</Typography>
    </Container>
  )

}

export default Header;