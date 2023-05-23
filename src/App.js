import { Provider } from "react-redux";
import { createStore } from "redux";
import storefrontReducer from "./store";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Categories from "./Components/Categories";
import Products from "./Components/Products";

import { Container } from "@mui/material";

const storeFront = createStore(storefrontReducer);

function App() {

  let categoryState = storeFront.getState().categories;
  
  return (
    <Provider store={storeFront}>
      <Header />
      <Container component='main' id='mainContainer'>
        <Categories categories={categoryState.categories}/>
        <Products />        
      </Container>
      <Footer />      
    </Provider>
  );
}

export default App;
