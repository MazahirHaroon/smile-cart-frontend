import { useState } from "react";

import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import routes from "routes";

import PageNotFound from "./components/commons/PageNotFound";
import Product from "./components/Product";
import ProductList from "./components/ProductList";
import CartItemsContext from "./contexts/CartItemsContext";
// eslint-disable-next-line import/extensions

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <>
      <div className="flex space-x-2">
        <NavLink exact activeClassName="underline font-bold" to="/">
          Home
        </NavLink>
        <NavLink exact activeClassName="underline font-bold" to="/product">
          Product
        </NavLink>
      </div>
      <CartItemsContext.Provider value={[cartItems, setCartItems]}>
        <Switch>
          <Route exact component={Product} path={routes.products.show} />
          <Route exact component={ProductList} path={routes.products.index} />
          <Redirect exact from={routes.root} to={routes.products.index} />
          <Route component={PageNotFound} path="*" />
        </Switch>
      </CartItemsContext.Provider>
    </>
  );
};

export default App;
