import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardActions, CardContent, CardHeader, Typography, CardMedia, Container, Button } from "@mui/material";

function Products() {

  const productState = useSelector(storefrontState => storefrontState.products);
  const categoryState = useSelector(storefrontState => storefrontState.categories);
  // const dispatch = useDispatch();

  return(
    categoryState.activeCategory.name ?
    <Container id='productsContainer'>
      {productState.allProducts.map(product => {
        if(product.category === categoryState.activeCategory.name){
          return <Card sx={{width: 300, height: 300, margin: '1rem'}}>
            <CardHeader 
              title={product.name}
              subheader={product.price}
            />
            <CardMedia
              sx={{height: 100}} 
              image='https://placehold.co/200.png'
            />
            <CardContent>
              <Typography variant="body2">
                {product.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained">
                Add To Cart
              </Button>
            </CardActions>
          </Card>        
        }
      })}      
    </Container> 

    : 
    productState.allProducts.map(product => product.name)
  )

}

export default Products;