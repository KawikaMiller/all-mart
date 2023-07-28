import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Card, CardActions, CardContent, CardHeader, Typography, CardMedia, Container, Button } from "@mui/material";

import productsSlice from "../../store/products";
import cartSlice from "../../store/cart";
import { modifyServerSideStock } from "../../store/cart";
import { addItemToCart, fetchProductsFromServer } from "../../store/products";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function Products() {

  const productState = useSelector(storefrontState => storefrontState.products);
  const categoryState = useSelector(storefrontState => storefrontState.categories);
  const cartState = useSelector(storefrontState => storefrontState.cart);
  const dispatch = useDispatch();

  let {setAllProducts} = productsSlice.actions;
  let {addToCart, modifyItemQuantity} = cartSlice.actions;


  const handleAddToCart = (product) => {
    // if product IS NOT in cart, add it to cart
    if (!cartState.items.find(item => item._id === product._id)) {
      dispatch(addItemToCart(product._id))
      .then(dispatch(addToCart(product)));  
    } 
    // otherwise, the product IS in the cart and we need to update the quantity of the item
    else {
      console.log('add to cart again')
      dispatch(modifyServerSideStock(product, 1))
      .then(dispatch(modifyItemQuantity({
        product,
        quantityChange: 1
      })));
    }
  }

  // fetches product data when component mounts (when page loads)
  useEffect(() => {
    dispatch(fetchProductsFromServer())
    .then(response => dispatch(setAllProducts(response.results)));
  },
  // eslint-disable-next-line 
  [])

  // fetches product data from the server any time our cart is modified so that the state stays in sync with whats on the server
  useEffect(() => {
    dispatch(fetchProductsFromServer())
    .then(results => dispatch(setAllProducts(results.results)));
  }, 
  // eslint-disable-next-line
  [cartState])

  return(
    
    <Container key='productsContainer' id='productsContainer'>
    {categoryState.activeCategory.name ?
      // displays products only if they match the active category
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
            <CardActions className="product-buttons">
              {product.inStock > 0 ?
                <Button variant="contained" onClick={() => handleAddToCart(product)}>
                  <AddShoppingCartIcon />
                  Add To Cart
                </Button>
              : 
                <Button disabled variant="contained">Out of Stock</Button>
              }
              <Button variant='contained'>
                <Link 
                  to={`/products/${product?._id}`} 
                  style={{textDecoration: 'none'}}
                  state={{product: product}}
                >
                  Details
                </Link>
              </Button>
            </CardActions>
          </Card>   

        }
        return null;
      })   

    : 
      // displays all products when there is no active category
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
          <CardActions className="product-buttons">
            {product.inStock > 0 ?
              <Button variant="contained" onClick={() => handleAddToCart(product)}>
                <AddShoppingCartIcon />
                Add To Cart
              </Button>
            : 
              <Button disabled variant="contained">Out of Stock</Button>
            }
            <Button variant='contained'>
              <Link 
                to={`/products/${product?._id}`} 
                style={{textDecoration: 'none'}}
                state={{product: product}}
              >
                Details
              </Link>
            </Button>
          </CardActions>
        </Card>
      })}
    </Container>
  )

}

export default Products;
// export { handleAddToCart }