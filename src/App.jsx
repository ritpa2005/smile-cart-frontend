// eslint-disable-next-line import/extensions

import { React } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import PageNotFound from "./components/commons/PageNotFound";
import Product from "./components/Product";
import ProductList from "./components/ProductList";

const App = () => (
  <Switch>
    <Route exact component={Product} path="/products/:slug" />
    <Route exact component={ProductList} path="/products" />
    <Redirect exact from="/" to="/products" />
    <Route component={PageNotFound} path="*" />
  </Switch>
);

export default App;
