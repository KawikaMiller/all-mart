import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Card, CardActions, CardContent, CardHeader, Typography, CardMedia, Container, Button } from "@mui/material";
import { addItemToCart, fetchProducts} from "../../store/products";
import { modifyCartItemQuantity } from "../../store/cart";
import { Link } from "react-router-dom";
import ProductDetails from "../ProductDetails";

function Products() {

  const productState = useSelector(storefrontState => storefrontState.products);
  const categoryState = useSelector(storefrontState => storefrontState.categories);
  const cartState = useSelector(storefrontState => storefrontState.cart);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    // if product IS NOT in cart, add it to cart
    if (!cartState.items.find(item => item._id === product._id)) {
      dispatch(addItemToCart(product._id));  
    } 
    // otherwise, the product IS in the cart and we need to update the quantity of the item
    else {
      dispatch(modifyCartItemQuantity(product, 1));
    }
  }

  // fetches product data when component mounts (when page loads)
  useEffect(() => {
    dispatch(fetchProducts())
  },
  // eslint-disable-next-line 
  [])

  // fetches product data from the server any time our cart is modified so that the state stays in sync with whats on the server
  useEffect(() => {
    dispatch(fetchProducts());
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
            <CardActions>
              {product.inStock > 0 ?
                  <>
                    <Button variant="contained" onClick={() => handleAddToCart(product)}>
                      Add To Cart
                    </Button>
                    <Button variant='contained'>
                      <Link 
                        to={`/products/${product?._id}`} 
                        style={{textDecoration: 'none'}}
                        state={{product: product}}
                      >
                        Details
                      </Link>
                    </Button>                      
                  </> 
                : 
                  <Button disabled variant="contained">Out of Stock</Button>
              }
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
          <CardActions>
            {product.inStock > 0 ?
              <>
                <Button variant="contained" onClick={() => handleAddToCart(product)}>
                  Add To Cart
                </Button>
                <Button variant='contained'>
                  <Link 
                    to={`/products/${product?._id}`} 
                    style={{textDecoration: 'none'}}
                    state={{product: product}}
                  >
                    Details
                  </Link>
                </Button>                
              </> 
              
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