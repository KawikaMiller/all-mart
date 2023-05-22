import { Provider } from "react-redux";
import { createStore } from "redux";
import storefrontReducer from "./store";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Categories from "./Components/Categories";
import Products from "./Components/Products";

const storeFront = createStore(storefrontReducer);

function App() {

  let categoryState = storeFront.getState().categories;
  
  return (
    <Provider store={storeFront}>
      <Header />
        <Categories categories={categoryState.categories}/>
        <Products />
      <Footer />      
    </Provider>
  );
}

export default App;
