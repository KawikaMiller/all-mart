import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Card, CardActions, CardContent, CardHeader, Typography, CardMedia, Container, Button } from "@mui/material";

function Products() {

  const productState = useSelector(storefrontState => storefrontState.products);
  const categoryState = useSelector(storefrontState => storefrontState.categories);
  const cartState = useSelector(storefrontState => storefrontState.cart);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    
    for (let i = 0; i < cartState.items.length; i++){
      if (cartState.items[i].name === product.name){
        console.log('found item')
        dispatch({
          type: 'MODIFY_QUANTITY',
          payload: {
            category: product.category,
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: 1
          }
        })
        return;
      }
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        category: product.category,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: 1
      }
    })
  }

  return(
    <Container key='productsContainer' id='productsContainer'>
    {categoryState.activeCategory.name ?

      productState.allProducts.map(product => {
        
        if(product.category === categoryState.activeCategory.name){

          return <Card key={`${product.name}_card`} sx={{width: 300, height: 300, margin: '1rem'}}>
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
              <Button variant="contained" onClick={() => handleAddToCart(product)}>
                Add To Cart
              </Button>
              
            </CardActions>
          </Card>   

        }
        return null;
      })   

    : 

    productState.allProducts.map(product => {
      return <Card key={`${product.name}_card`} sx={{width: 300, height: 300, margin: '1rem'}}>
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
          <Button variant="contained"  onClick={() => handleAddToCart(product)}>
            Add To Cart
          </Button>
        </CardActions>
      </Card>
    })}
    </Container>
  )

}

export default Products;