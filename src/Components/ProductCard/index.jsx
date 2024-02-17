import React from "react";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Card, CardActions, CardHeader, CardMedia, Button } from "@mui/material";

function ProductCard({product, handleAddToCart}){

  return(
    <Card key={`${product.name}_card`} className="product-card">
      <CardHeader 
        title={
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            {product.name}
            {<p style={{fontSize: '0.75rem', color: 'grey'}}>{product.department}</p>}
          </div>
        }
        subheader={`$${product.price}`}
      />
      <CardMedia 
        sx={{height: 200, margin: '1rem', border: '1px solid black'}} 
        image='https://placehold.co/200.png'
      />
      <CardActions className="product-buttons">
        {product.stock > 0 ?
          <Button variant="contained" onClick={() => handleAddToCart(product)} className='product-card-button-add'>
            <AddShoppingCartIcon />
            Add To Cart
          </Button>
        : 
          <Button disabled variant="contained">Out of Stock</Button>
        }
        <Button variant='contained' className='product-card-button-details'>
          <Link 
            to={`/products/${product.id}`} 
            style={{textDecoration: 'none'}}
            state={{product: product}}
          >
            Details
          </Link>
        </Button>
      </CardActions>
    </Card>
  )

}

export default ProductCard;