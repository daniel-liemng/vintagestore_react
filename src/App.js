import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import pages
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import Error from "./pages/Error";
import Alert from "./components/Alert";
import PrivateRoute from "./components/PrivateRoute";

// import components
import Header from "./components/Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Alert />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/cart" component={Cart} />
          {/* <PrivateRoute path="/checkout" component={Checkout} /> */}
          <PrivateRoute path="/checkout" name="liem" msg="hello">
            <Checkout />
          </PrivateRoute>
          <Route path="/login" component={Login} />
          <Route exact path="/products" component={Products} />
          <Route path="/products/:id" children={<ProductDetails />} />
          <Route path="*" component={Error} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
