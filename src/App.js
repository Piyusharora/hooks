import React, {Component} from 'react';
import Checkout from './components/Checkout/Checkout.module.js';
import BurgerBuilder from './components/containers/BurgerBuilder/BurgerBuilder.module.js';
//import './App.css';
import Orders from './components/containers/Orders/Orders.module';
import Layout from './components/Layout/Layout.module.js';
import {Route, Switch} from 'react-router-dom';
class App extends Component {
  render(){
  return (
    <div>
      <Layout>
        <Switch>
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" component={Orders} />
        <Route path="/" exact component={BurgerBuilder}/> 
       </Switch>
      </Layout>
    </div> 
  );
  }
}
export default App;
