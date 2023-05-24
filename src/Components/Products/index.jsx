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

    let foundProduct = productState.allProducts.find(item => item.name === product.name);

    // if product is in stock, update the number of products in stock
    if (foundProduct.stock > 0) {
      dispatch({
        type: 'UPDATE_STOCK',
        payload: {
          name: foundProduct.name,
          quantity: 1
        }
      })

    // after stock has been updated, either add a new item to the cart or modify the cart item's quantity if the item is already in the cart
    for (let i = 0; i < cartState.items.length; i++){
      if (cartState.items[i].name === product.name){
        dispatch({
          type: 'MODIFY_QUANTITY',
          payload: {
            name: product.name,
            quantity: 1
          }
        })
        // prevents code from further executing
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
  }

  return(
    <Container key='productsContainer' id='productsContainer'>
    {categoryState.activeCategory.name ?

      productState.allProducts.map(product => {
        
        if(product.category === categoryState.activeCategory.name){

          return <Card key={`${product.name}_card`} sx={{width: 300, height: 300, margin: '1rem'}}>
            <CardHeader 
              title={product.name}
              subheader={`$${product.price}`}
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
              {product.stock > 0 ? 
                  <Button variant="contained" onClick={() => handleAddToCart(product)}>
                    Add To Cart
                  </Button>                
                : 
                  <Button disabled variant="contained">Out of Stock</Button>
              }
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
          subheader={`$${product.price}`}
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
          {product.stock > 0 ? 
              <Button variant="contained" onClick={() => handleAddToCart(product)}>
                Add To Cart
              </Button>                
            : 
              <Button disabled variant="contained">Out of Stock</Button>
          }
        </CardActions>
      </Card>
    })}
    </Container>
  )

}

export default Products;