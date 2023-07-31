import React from "react";
import { useLocation } from "react-router";
import { Card, CardActions, CardContent, CardHeader, Typography, CardMedia, Box, Button, Rating, ImageList, ImageListItem, Container, Divider } from "@mui/material";
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

        <div style={{width: '30%'}}>
          <Card>
            <CardHeader title={state.product.name} subheader={state.product.category.toUpperCase()}>
            </CardHeader>
            <Rating sx={{padding: '1rem'}} readOnly value={3}/>
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
        </div>

      </div>
   
    </>
  )

}

export default ProductDetails;