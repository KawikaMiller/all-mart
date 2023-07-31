import React from "react";
import { useLocation } from "react-router";
import { Card, CardActions, CardContent, CardHeader, Typography, CardMedia, Box, Button, Rating, ImageList, ImageListItem, Container, Divider, TextField, Accordion, AccordionSummary, AccordionDetails  } from "@mui/material";
import { addItemToCart } from "../../store/products";
import { modifyServerSideStock } from "../../store/cart";
import cartSlice from "../../store/cart";
import { useSelector, useDispatch } from "react-redux";


function ProductDetails(props) {

  const cartState = useSelector(storefrontState => storefrontState.cart);
  let { state } = useLocation();
  let { addToCart } = cartSlice.actions;
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    // if product IS NOT in cart, add it to cart
    if (!cartState.items.find(item => item._id === product._id)) {
      dispatch(addItemToCart(product._id))
      .then(dispatch(addToCart(product)));  
    } 
    // otherwise, the product IS in the cart and we need to update the quantity of the item
    else {
      dispatch(modifyServerSideStock(product, 1));
    }
  }


  return(
    <>
      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '2rem'}} id='product-details'>

        <div style={{display: 'flex', width: '70%'}}>
          <ImageList sx={{width: 100, height: 'auto'}} cols={1}>
            {/* There are no images inside of the product object, so the placeholders will be hardcoded.*/}
            <ImageListItem>
              <img 
                src="https://placehold.co/100.png"
                alt={`Empty placeholder for ${state.product.name}`}
                />
            </ImageListItem>
            <ImageListItem>
              <img 
                src="https://placehold.co/100.png"
                alt={`Empty placeholder for ${state.product.name}`}
                />
            </ImageListItem>
            <ImageListItem>
              <img 
                src="https://placehold.co/100.png"
                alt={`Empty placeholder for ${state.product.name}`}
                />
            </ImageListItem>
            <ImageListItem>
              <img 
                src="https://placehold.co/100.png"
                alt={`Empty placeholder for ${state.product.name}`}
                />
            </ImageListItem>
            <ImageListItem>
              <img 
                src="https://placehold.co/100.png"
                alt={`Empty placeholder for ${state.product.name}`}
                />
            </ImageListItem>
          </ImageList>
          <Container style={{display: 'flex', justifyContent: 'center'}}>
            <img src="https://placehold.co/500.png" alt={`Main empty placeholder of ${state.product.name}`}/>
          </Container>
        </div>

        <div style={{width: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <Card>
            <CardHeader 
            title={<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            {state.product.name}
            <Rating sx={{padding: '1rem'}} readOnly value={3}/>
            </div>} 
            subheader={state.product.category.toUpperCase()}
            />
            <Divider variant="middle" />
            <CardContent>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h4">
                  {`$${state.product.price}`}
                </Typography>
              </div>
              <Typography variant="h6" sx={{color: 'grey'}}>
              {`In Stock: ${state.product.inStock}`}
              </Typography>
            </CardContent>
            <CardActions sx={{justifyContent: 'center'}}>
              {state.product.inStock > 0 ?
                <Button variant="contained" onClick={() => handleAddToCart(state.product)} sx={{width: '90%'}}>
                  {`Add To Cart`}
                </Button>                    
              : 
              <Button variant="contained" disabled >Out of Stock</Button>
            }
            </CardActions>
          </Card>
          <br/>
          <div style={{display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: '5px', padding: '1rem', color: 'black'}}>
            <Typography variant="h6" sx={{color: 'indianred'}}>
              Review
            </Typography>
            <TextField
              sx={{border: '1px solid indianred', borderRadius: '5px'}}
              variant='outlined'
              multiline
              rows={4}
              placeholder="Review this product..."
            />
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem'}}>
              <Rating />
              <Button variant="contained">Submit</Button>
            </div>
          </div>
        </div>

      </div>
      <hr/>
      <div>
        <Typography variant="h5">About This Product</Typography>
        <div>
          <Accordion>
            <AccordionSummary>
              Product Details
            </AccordionSummary>
            <Divider variant="middle" sx={{backgroundColor: 'white'}}/>
            <AccordionDetails>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, sunt iste quas alias necessitatibus illo doloribus veritatis quaerat dolorum ad nisi odit animi libero porro quam at rem molestias ratione tempora? Nesciunt ducimus fugiat consequatur? Totam nam magnam illo debitis tenetur necessitatibus! Eaque rem nihil veniam doloremque, adipisci mollitia minus?
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              Specifications
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, sunt iste quas alias necessitatibus illo doloribus veritatis quaerat dolorum ad nisi odit animi libero porro quam at rem molestias ratione tempora? Nesciunt ducimus fugiat consequatur? Totam nam magnam illo debitis tenetur necessitatibus! Eaque rem nihil veniam doloremque, adipisci mollitia minus?
            </AccordionDetails>
          </Accordion> 
          <Accordion>
            <AccordionSummary>
              Warranty
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, sunt iste quas alias necessitatibus illo doloribus veritatis quaerat dolorum ad nisi odit animi libero porro quam at rem molestias ratione tempora? Nesciunt ducimus fugiat consequatur? Totam nam magnam illo debitis tenetur necessitatibus! Eaque rem nihil veniam doloremque, adipisci mollitia minus?
            </AccordionDetails>
          </Accordion> 
          <Accordion>
            <AccordionSummary>
              Warnings
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, sunt iste quas alias necessitatibus illo doloribus veritatis quaerat dolorum ad nisi odit animi libero porro quam at rem molestias ratione tempora? Nesciunt ducimus fugiat consequatur? Totam nam magnam illo debitis tenetur necessitatibus! Eaque rem nihil veniam doloremque, adipisci mollitia minus?
            </AccordionDetails>
          </Accordion>
        </div>

      </div>
    </>
  )

}

export default ProductDetails;