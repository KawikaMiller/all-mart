import React from "react";
import { useSelector, useDispatch } from "react-redux";

function Products() {

  const productState = useSelector(storefrontState => storefrontState.products);
  const categoryState = useSelector(storefrontState => storefrontState.categories);
  // const dispatch = useDispatch();

  return(
    categoryState.activeCategory.name ? 
    productState.allProducts.map(product => {
      if(product.category === categoryState.activeCategory.name){
        return product.name        
      }
    })
    : 
    productState.allProducts.map(product => product.name)
  )

}

export default Products;