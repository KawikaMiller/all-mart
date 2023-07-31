import React from "react";
import { Typography, Box, Divider, TextField, Button } from "@mui/material";
import { Email, Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';

function Footer(props) {

  return(
    <footer component='footer' id='storeFooter' >
      <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%'}}>
        <Box class='footer-addon'>
          <Typography>About All-Mart</Typography>
          <Divider variant='middle' style={{width: '100%', background: 'white'}}/>
          <Typography variant='subtitle2'>About Us</Typography>
          <Typography variant='subtitle2'>Contact Us</Typography>
          <Typography variant='subtitle2'>Careers</Typography>
          <Typography variant='subtitle2'>Affiliates</Typography>
          <Typography variant='subtitle2'>Sitemap</Typography>
        </Box>
        <Box class='footer-addon'>
          <Typography>My All-Mart</Typography>
          <Divider variant='middle' style={{width: '100%', background: 'white'}}/>
          <Typography variant='subtitle2'>My Account</Typography>
          <Typography variant='subtitle2'>Order Status</Typography>
          <Typography variant='subtitle2'>All-Mart Rewards</Typography>
          <Typography variant='subtitle2'>Wishlist</Typography>
          <Typography variant='subtitle2'>All-Star Membership</Typography>
        </Box>
        <Box class='footer-addon'>
          <Typography>Help & FAQs</Typography>
          <Divider variant='middle' style={{width: '100%', background: 'white'}}/>
          <Typography variant='subtitle2'>Online Ordering</Typography>
          <Typography variant='subtitle2'>Shipping</Typography>
          <Typography variant='subtitle2'>Billing</Typography>
          <Typography variant='subtitle2'>Returns & Exchanges</Typography>
          <Typography variant='subtitle2'>Customer Service</Typography>
        </Box>
        <Box class='footer-addon'>
          <Typography>Ways To Shop</Typography>
          <Divider variant='middle' style={{width: '100%', background: 'white'}}/>
          <Typography variant='subtitle2'>Just Arrived</Typography>
          <Typography variant='subtitle2'>Best Sellers</Typography>
          <Typography variant='subtitle2'>On Sale</Typography>
          <Typography variant='subtitle2'>Gift Cards</Typography>
          <Typography variant='subtitle2'>Store Locations</Typography>
        </Box>
      </div>
      <Divider variant='middle' style={{width: '90%', background: 'white'}}/>

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem', width: '85%'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <TextField size="small" placeholder="Sign Up For Emails" sx={{color: 'white', background: 'white'}}/>
        <Button variant='contained' size="large">
          <Email />
        </Button>
        </div>

        <div id='social-icons'>
          <Facebook />
          <Twitter />
          <Instagram />
          <YouTube />
        </div>
      </div>

      <Typography sx={{fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.4)'}}>
        Copyright © 2023 Kawika Miller. All rights reserved. 
      </Typography>
      <Typography sx={{fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.4)'}}>
        Author: Kawika Miller | GitHub: www.github.com/kmartwork
      </Typography>
    </footer>
  )

}

export default Footer;